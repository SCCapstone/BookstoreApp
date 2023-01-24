import React from 'react'; 

const EmployeeHomepage = () => { 
    return ( 
    <div className="bg-white rounded-lg p-6"> 
        <h1 className="text-2xl font-medium mb-4 text-center">
            Welcome, Employee!
        </h1> 
        <h2 className="text-lg font-medium mb-4 text-center">
            Upcoming Meeting
        </h2>
            <ul className="list-disc pl-4">
                <li className="mb-2">
                    Meeting 1
                </li>
                <li className="mb-2">
                    Meeting 2
                </li>
                <li className="mb-2">
                    Meeting 3
                </li>
        </ul>
    </div>
    );
};

export default EmployeeHomepage;
