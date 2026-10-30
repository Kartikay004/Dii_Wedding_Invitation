export const SettingsContainer = ({ children }) => <div style={{ padding: '20px', border: '1px solid #ddd' }}>{children}</div>;
export const Section = ({ title, children }) => <div><h2>{title}</h2>{children}</div>;
export const ToggleSwitch = ({ label, description, checked, onChange }) => (
  <div style={{ padding: '10px' }}>
    <label>{label}</label>
    <p style={{ fontSize: '0.8em', color: '#666' }}>{description}</p>
    <input type="checkbox" checked={checked} onChange={onChange} />
  </div>
);
export const Button = ({ children, onClick, variant, disabled, style }) => (
  <button onClick={onClick} disabled={disabled} style={{ padding: '10px', margin: '5px', backgroundColor: variant === 'primary' ? 'blue' : 'gray', color: 'white', border: 'none', cursor: 'pointer', ...style }}>{children}</button>
);
export const Modal = ({ isOpen, title, children }) => (
  isOpen ? (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
      <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '8px', minWidth: '400px', boxShadow: '0 4px 10px rgba(0,0,0,0.2)' }}>
            <h3>{title}</h3>
            {children}
      </div>
    </div>
  ) : null
);
