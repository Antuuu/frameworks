import React, { useState, ChangeEvent, FormEvent } from 'react';

interface UserFormProps {
  onSubmit: (userData: any) => void;
}

const UserForm: React.FC<UserFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    address: {
      street: '',
      suite: '',
      city: '',
      zipcode: '',
      geo: {
        lat: '',
        lng: '',
      },
    },
    phone: '',
    website: '',
    company: {
      name: '',
      catchPhrase: '',
      bs: '',
    },
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      address: {
        ...prevData.address,
        [name]: value,
      },
    }));
  };

  const handleGeoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      address: {
        ...prevData.address,
        geo: {
          ...prevData.address.geo,
          [name]: value,
        },
      },
    }));
  };

  const handleCompanyChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      company: {
        ...prevData.company,
        [name]: value,
      },
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" name="name" value={formData.name} onChange={handleChange} />
      </label>
      <label>
        Username:
        <input type="text" name="username" value={formData.username} onChange={handleChange} />
      </label>
      <label>
        Email:
        <input type="email" name="email" value={formData.email} onChange={handleChange} />
      </label>
      <label>
        Street:
        <input type="text" name="street" value={formData.address.street} onChange={handleAddressChange} />
      </label>
      <label>
        Suite:
        <input type="text" name="suite" value={formData.address.suite} onChange={handleAddressChange} />
      </label>
      <label>
        City:
        <input type="text" name="city" value={formData.address.city} onChange={handleAddressChange} />
      </label>
      <label>
        Zipcode:
        <input type="text" name="zipcode" value={formData.address.zipcode} onChange={handleAddressChange} />
      </label>
      <label>
        Latitude:
        <input type="text" name="lat" value={formData.address.geo.lat} onChange={handleGeoChange} />
      </label>
      <label>
        Longitude:
        <input type="text" name="lng" value={formData.address.geo.lng} onChange={handleGeoChange} />
      </label>
      <label>
        Phone:
        <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
      </label>
      <label>
        Website:
        <input type="text" name="website" value={formData.website} onChange={handleChange} />
      </label>
      <label>
        Company Name:
        <input type="text" name="name" value={formData.company.name} onChange={handleCompanyChange} />
      </label>
      <label>
        Catchphrase:
        <input type="text" name="catchPhrase" value={formData.company.catchPhrase} onChange={handleCompanyChange} />
      </label>
      <label>
        BS:
        <input type="text" name="bs" value={formData.company.bs} onChange={handleCompanyChange} />
      </label>
      <button type="submit">Update User</button>
    </form>
  );
};

export default UserForm;
