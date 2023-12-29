import { useState, useEffect } from 'react';
import { Chart } from 'react-google-charts';
import axios from 'axios';
import { useAuth } from '../AuthContext';

const DashboardPage = () => {
  const { token } = useAuth();
  const [monthlySalesData, setMonthlySalesData] = useState([]);
  const [todayAppointments, setTodayAppointments] = useState([]);

  useEffect(() => {
    const fetchMonthlySalesData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/appointments/done', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        const monthNames = [
          'January', 'February', 'March', 'April', 'May', 'June',
          'July', 'August', 'September', 'October', 'November', 'December',
        ];

        const salesData = response.data.map(order => {
          const orderMonth = new Date(order.schedule).getMonth();
          return {
            orderMonth,
            salesQuantity: 1, 
          };
        });

        const aggregatedData = salesData.reduce((acc, { orderMonth, salesQuantity }) => {
          const monthName = monthNames[orderMonth];
          acc[monthName] = (acc[monthName] || 0) + salesQuantity;
          return acc;
        }, {});

        const chartDataArray = Object.entries(aggregatedData).map(([orderMonth, salesQuantity]) => [
          `${orderMonth}`,
          salesQuantity,
        ]);

        setMonthlySalesData([['Month', 'Sales Quantity'], ...chartDataArray]);
      } catch (error) {
        console.error('Error fetching monthly sales data:', error);
      }
    };

    const fetchTodayAppointments = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/appointments/confirmed', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        const today = new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
        });

        const todayAppointments = response.data.filter(appointment => {
          const appointmentDate = new Date(appointment.schedule).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
          });
          return appointmentDate === today;
        });

        setTodayAppointments(todayAppointments);
      } catch (error) {
        console.error('Error fetching today\'s appointments:', error);
      }
    };

    fetchMonthlySalesData();
    fetchTodayAppointments();
  }, []);

  return (
    <div className="container">
      <h1>Admin Dashboard</h1>
      <div className="ChartContainer">
        <h2>Monthly Sales</h2>
        <Chart
          chartType="BarChart"
          data={monthlySalesData}
          options={{
            title: 'Monthly Sales Comparison',
            hAxis: {
              title: 'Month',
            },
            vAxis: {
              title: 'Sales Quantity',
            },
          }}
          width="81vw"
        />
      </div>

      <div className="TodayAppointments">
        <h2>Today&apos;s Appointments</h2>
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
            {todayAppointments.map((appointment) => (
              <tr key={appointment._id}>
                <td>{appointment.user.username}</td>
                <td>{appointment.user.email}</td>
                <td>{appointment.user.phoneNumber}</td>
                <td>{appointment.dogCategory}</td>
                <td>{appointment.service}</td>
                <td>{new Date(appointment.schedule).toLocaleTimeString()}</td>
                <td>{appointment.price}</td>
                <td>{appointment.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardPage;
