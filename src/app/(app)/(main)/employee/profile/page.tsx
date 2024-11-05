'use server';

import EmployeeInfo from '@/components/employee/EmployeeInfo';
import EmployeeReviews from '@/components/employee/EmployeeReviews';
import { getEmployeeById, getEmployeePosts, getEmployeeRating } from '@/actions';
import {auth}  from '@/auth.config'; // Ensure next-auth is configured correctly
import { Review } from '@prisma/client';
import EmployeePosts from '@/components/employee/EmployeePost';

interface EmployeeProfile {
  name: string;
  profileImageUrl: string;
  role: string;
  rating: number;
  reviews: Review[];
}

const Page = async () => {
  try {
    const session = await auth(); 

    if (!session || !session.user || !session.user.id) {
      return (
        <div className="text-red-500">Error: User not authenticated</div>
      );
    }

    const employeeData = await getEmployeeById(session.user.id);
    if (!employeeData) {
      return (
        <div className="text-red-500">Error: Employee not found</div>
      );
    }

    const rating = await getEmployeeRating(employeeData.id);
    const employeePost = await getEmployeePosts(employeeData.id);

    

    const employee: EmployeeProfile = {
      name: `${employeeData.firstName} ${employeeData.lastName}` || 'Anonymous',
      profileImageUrl: employeeData.profileImage || '/ui/profile/default-avatar.jpg',
      role: employeeData.role || 'Employee',
      rating: rating || 0,
      reviews: employeeData.reviewsReceived || [],
    };

    return (
      <div className="max-w-4xl mx-auto p-6 shadow-lg rounded-lg mt-10">
        <EmployeeInfo
          name={employee.name}
          photoUrl={employee.profileImageUrl}
          specialty={employee.role}
          rating={employee.rating}
        />
        
        
        <EmployeePosts posts={employeePost} />
        <EmployeeReviews reviews={employee.reviews} />
      </div>
    );
  } catch (err: any) {
    return (
      <div className="text-red-500">Error: {err.message || 'Error fetching employee data'}</div>
    );
  }
};

export default Page;
