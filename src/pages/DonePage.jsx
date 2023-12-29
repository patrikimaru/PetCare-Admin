import { useState, useEffect } from 'react';
import { useAuth } from '../AuthContext';
import axios from 'axios';

const DonePage = () => {
  const { token } = useAuth();
  const [doneAppointments, setDoneAppointments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('name');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedDogCategory, setSelectedDogCategory] = useState('');
  const [selectedService, setSelectedService] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/appointments/done',{
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        setDoneAppointments(response.data);
      } catch (error) {
        console.error('Error fetching done appointments:', error);
      }
    };

    fetchData();
  }, [doneAppointments]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'};
    const formattedDate = new Date(dateString).toLocaleDateString('en-US', options);
    const [datePart, timePart] = formattedDate.split(', ');
    return `${datePart} ${timePart}`;
  };

  const filterAppointments = () => {
    return doneAppointments.filter((appointment) => {
      const normalizedSearchTerm = searchTerm.toLowerCase();
      const appointmentMonth = new Date(appointment.schedule).toLocaleDateString('en-US', { month: 'long' }).toLowerCase();

      const matchesSearchTerm = () => {
        switch (filterType) {
          case 'name':
            return appointment.user.username.toLowerCase().includes(normalizedSearchTerm);
          case 'email':
            return appointment.user.email.toLowerCase().includes(normalizedSearchTerm);
          case 'phone':
            return String(appointment.user.phoneNumber).includes(normalizedSearchTerm);
          default:
            return true;
        }
      };
      
      const matchesMonth = () => {
        return selectedMonth ? appointmentMonth.includes(selectedMonth.toLowerCase()) : true;
      };

      const matchesDogCategory = () => {
        return selectedDogCategory ? appointment.dogCategory.toLowerCase() === selectedDogCategory.toLowerCase() : true;
      };

      const matchesService = () => {
        return selectedService ? appointment.service.toLowerCase() === selectedService.toLowerCase() : true;
      };

      return matchesSearchTerm() && matchesMonth() && matchesDogCategory() && matchesService();
    });
  };

  const filteredAppointments = filterAppointments();

  const months = Array.from({ length: 12 }, (_, i) => new Date(null, i + 1, null).toLocaleDateString('en-US', { month: 'long' }));
  const dogCategories = ['Small', 'Medium', 'Big', 'Super'];
  const services = ['Basic', 'Premium', 'Royal'];

  return (
    <div>
      <h2>Done Appointments</h2>

      <div className="dropdown-container">
        <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)} className="filter-dropdown">
          <option value="">All Months</option>
          {months.map((month, index) => (
            <option key={index} value={month}>{month}</option>
          ))}
        </select>

        <select value={selectedDogCategory} onChange={(e) => setSelectedDogCategory(e.target.value)} className="filter-dropdown">
          <option value="">All Dog Categories</option>
          {dogCategories.map((category, index) => (
            <option key={index} value={category.toLowerCase()}>{category}</option>
          ))}
        </select>

        <select value={selectedService} onChange={(e) => setSelectedService(e.target.value)} className="filter-dropdown">
          <option value="">All Services</option>
          {services.map((service, index) => (
            <option key={index} value={service.toLowerCase()}>{service}</option>
          ))}
        </select>
      </div>

      <div className="search-filter-container">
        <input
          type="text"
          className="search-input"
          placeholder={`Search by ${filterType === 'phone' ? 'phone number' : filterType}`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="filter-dropdown">
          <option value="name">Name</option>
          <option value="email">Email</option>
          <option value="phone">Phone Number</option>
          <option value="dogCategory">Dog Category</option>
          <option value="service">Service</option>
        </select>
      </div>

      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email Address</th>
            <th>Phone Number</th>
            <th>Dog Category</th>
            <th>Service</th>
            <th>Schedule</th>
            <th>Price</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredAppointments.map((appointment) => (
            <tr key={appointment._id}>
              <td>{appointment.user.username}</td>
              <td>{appointment.user.email}</td>
              <td>{appointment.user.phoneNumber}</td>
              <td>{appointment.dogCategory}</td>
              <td>{appointment.service}</td>
              <td>{formatDate(appointment.schedule)}</td>
              <td>{appointment.price}</td>
              <td>{appointment.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DonePage;
