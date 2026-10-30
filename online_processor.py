import google.generativeai as genai
import json

# --- 1. THE FIRST MISSING PIECE (The System Prompt) ---
# You must define SYSTEM_PROMPT before the class uses it.
SYSTEM_PROMPT = """
You are a 'Planner' module for an AI operating system. Your ONLY job is to convert a user's command into a precise, step-by-step JSON plan.

You MUST ONLY output a single, valid JSON object. Do not output markdown (like ```json), explanations, or any other text.

**JSON SCHEMA:**
Your output MUST conform to this exact schema:
{
  "plan_name": "A descriptive name for the plan",
  "steps": [
    {
      "id": (integer, starting from 1),
      "action": "ALLOWED_ACTION_NAME",
      "parameters": { (dictionary of parameters) },
      "reason": "Your reasoning for this step."
    }
  ]
}

**ALLOWED ACTIONS & PARAMETERS:**

1.  **"open_app"**: Opens an application.
    * `parameters`: {"app_name": "name_of_app"}
    * (Note: For "text editor" on Ubuntu, default to "gedit".)

2.  **"web_search"**: Performs a web search.
    * `parameters`: {"query": "search_query"}

3.  **"type_text"**: Types text into the currently active window.
    * `parameters`: {"content": "text_to_type_or_{PLACEHOLDER}"}
    * (Note: If content depends on a previous step, use a placeholder like {STEP_2_RESULT}.)

4.  **"fail"**: Use this action if the user's command cannot be fulfilled.
    * `parameters`: {"reason": "explanation_of_failure"}

**RULES:**
1.  Always and only output valid JSON.
2.  Deconstruct the user's command into a logical sequence of the ALLOWED ACTIONS.
3.  The 'id' for steps must be sequential integers starting at 1.
4.  If the user's command is vague (e.g., "make me notes"), you must infer the steps (e.g., search for the topic, then open an editor, then type the notes).
"""

# --- This is Anurag's placeholder class ---
class BaseProcessor:
    """
    The base class that all processor modules inherit from.
    (As defined by Anurag, the Team Lead)
    """
    def process(self, command):
        raise NotImplementedError

# --- This is YOUR class, Adarsh ---
class OnlineProcessor(BaseProcessor):
    """
    The "Brain." Inherits from BaseProcessor.
    Uses an LLM to convert natural language into a JSON plan.
    """
    
    def __init__(self, api_key):
        genai.configure(api_key=api_key)
        
        # This is CRITICAL: It forces the model to output JSON.
        generation_config = {
            "response_mime_type": "application/json",
        }
        
        # Set up the model
        self.model = genai.GenerativeModel(
            'gemini-1.5-pro-latest',  # <-- Use the newest model
            generation_config=generation_config
        )
        # This line now works because SYSTEM_PROMPT is defined above
        self.system_prompt = SYSTEM_PROMPT
        print("🧠 'Brain' (OnlineProcessor) initialized.")

    def process(self, user_command: str) -> dict:
        """
        Takes a user's command and returns a valid JSON plan.
        """
        print(f"🧠 [Brain] Received command: '{user_command}'")
        
        # Create the full prompt to send to the model
        prompt_parts = [
            self.system_prompt,
            "\n---",
            "USER_COMMAND:",
            user_command
        ]

        try:
            # 1. Call the Gemini API
            response = self.model.generate_content(prompt_parts)
            
            # 2. Extract the raw JSON text
            json_text = response.text
            
            # 3. Validate and parse the JSON
            plan = self._validate_and_parse(json_text)
            print("🧠 [Brain] Successfully generated and validated plan.")
            return plan

        except Exception as e:
            print(f"🧠 [Brain] CRITICAL ERROR during processing: {e}")
            # If anything fails, return a valid "fail" plan
            return self._generate_failure_plan(f"LLM or API error: {e}")
            
    def _validate_and_parse(self, json_text: str) -> dict:
        """
        Task 4: JSON Validation.
        Parses the LLM's text output and validates its structure.
        """
        try:
            # Parse the string into a Python dictionary
            data = json.loads(json_text)
            
            # --- Your Next Step: Schema Validation ---
            # This is where you would use `jsonschema.validate(instance=data, schema=YOUR_SCHEMA)`
            # For now, we'll do a basic check.
            
            if 'plan_name' in data and 'steps' in data and isinstance(data['steps'], list):
                print("🧠 [Brain] JSON syntax OK. Basic structure OK.")
                return data
            else:
                raise ValueError("Invalid plan structure: 'plan_name' or 'steps' key is missing or invalid.")

        except json.JSONDecodeError as e:
            print(f"🧠 [Brain] JSON VALIDATION FAILED: Failed to decode LLM output.")
            print(f"   Error: {e}")
            print(f"   Raw output was: {json_text}")
            return self._generate_failure_plan(f"Invalid JSON response from LLM: {e}")
        except ValueError as e:
            print(f"🧠 [Brain] Plan Structure Error: {e}")
            return self._generate_failure_plan(f"Plan structure invalid: {e}")

    def _generate_failure_plan(self, reason: str) -> dict:
        """A robust fallback to create a valid plan that reports the failure."""
        return {
            "plan_name": "Processing Failure",
            "steps": [
                {
                    "id": 1,
                    "action": "fail",
                    "parameters": {"reason": str(reason)},
                    "reason": "The 'Brain' (OnlineProcessor) failed to generate a valid plan."
                }
            ]
        }

# --- 2. THE SECOND MISSING PIECE (The "Play Button") ---
# This block of code actually RUNS everything.
if __name__ == "__main__":
    
    # --- We are HARD-CODING the key to test ---
    # 1. Get a NEW key from Google AI Studio.
    # 2. Paste it here.
    API_KEY = "AIzaSyBS6bJKCJF9RBfDeZoPodFINm4yCRMJwdQ" 

    # 1. Initialize the Brain
    print("--- Initializing Brain ---")
    brain = OnlineProcessor(api_key=API_KEY)
    
    # 2. Define the user command from your example
    command = "open a text editor and make me notes on computer science."
    
    # 3. Process the command
    json_plan = brain.process(command)
    
    # 4. Print the final, validated JSON plan
    print("\n--- FINAL JSON PLAN (Output from Brain) ---")
    print(json.dumps(json_plan, indent=2))