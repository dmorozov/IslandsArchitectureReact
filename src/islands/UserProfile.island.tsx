import { useState } from 'react';

interface User {
  name: string;
  email: string;
  role: string;
}

export default function UserProfile() {
  const [user, setUser] = useState<User>({
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Developer',
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (field: keyof User, value: string) => {
    setUser({ ...user, [field]: value });
  };

  return (
    <div
      style={{
        padding: '20px',
        border: '2px solid #4caf50',
        borderRadius: '8px',
        margin: '20px 0',
        maxWidth: '500px',
      }}
    >
      <h2>User Profile Island</h2>
      {isEditing ? (
        <div>
          <div style={{ marginBottom: '10px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>
              Name:
            </label>
            <input
              type="text"
              value={user.name}
              onChange={e => handleChange('name', e.target.value)}
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '4px',
                border: '1px solid #ccc',
              }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>
              Email:
            </label>
            <input
              type="email"
              value={user.email}
              onChange={e => handleChange('email', e.target.value)}
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '4px',
                border: '1px solid #ccc',
              }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>
              Role:
            </label>
            <input
              type="text"
              value={user.role}
              onChange={e => handleChange('role', e.target.value)}
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '4px',
                border: '1px solid #ccc',
              }}
            />
          </div>
        </div>
      ) : (
        <div style={{ marginBottom: '15px' }}>
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Role:</strong> {user.role}
          </p>
        </div>
      )}
      <button
        onClick={() => setIsEditing(!isEditing)}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#4caf50',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        {isEditing ? 'Save' : 'Edit'}
      </button>
    </div>
  );
}
