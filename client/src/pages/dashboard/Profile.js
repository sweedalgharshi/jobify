import { useState } from 'react';
import Wrapper from '../../assets/wrappers/DashboardFormPage';
import { FormRow, Alert } from '../../components';
import { useAppContext } from '../../context/appContext';

function Profile() {
  const { user, showAlert, displayAlert, isLoading, updateUser } =
    useAppContext();
  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [lastName, setLastName] = useState(user?.lastName);
  const [location, setLocation] = useState(user?.location);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !location || !lastName) {
      displayAlert();
      return;
    }

    updateUser({ name, email, lastName, location });
  };

  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h3>profile</h3>

        {showAlert && <Alert />}

        <div className="form-center">
          <FormRow
            type="text"
            name="name"
            value={name}
            handleChange={(e) => setName(e.target.value)}
          />

          <FormRow
            labelText="last name"
            type="text"
            name="lastName"
            value={lastName}
            handleChange={(e) => setLastName(e.target.value)}
          />

          <FormRow
            type="text"
            name="email"
            value={email}
            handleChange={(e) => setEmail(e.target.value)}
          />

          <FormRow
            type="text"
            name="location"
            value={location}
            handleChange={(e) => setLocation(e.target.value)}
          />

          <button
            className="btn btn-block"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Please wait...' : 'save changes'}
          </button>
        </div>
      </form>
    </Wrapper>
  );
}
export default Profile;
