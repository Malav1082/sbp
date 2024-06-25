import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import { Button, Input, Alert, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import { getEmployees, deleteEmployee } from "../services/UserService";
import "../styles/background.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Home = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [sortField, setSortField] = useState("empName");
  const [sortDirection, setSortDirection] = useState("asc");
  const [search, setSearch] = useState("");
  const [selectedField, setSelectedField] = useState("all");
  const [successMessage, setSuccessMessage] = useState("");
  const [dropdownOpen, setDropDownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Home";
    let isMounted = true;
    fetchEmployees().then(() => {
      if (isMounted) {
        console.log("Data fetched successfully");
      }
    });

    return () => {
      isMounted = false; // Cleanup function to avoid setting state if the component is unmounted
    };
  }, [page, pageSize]);

  const fetchEmployees = async () => {
    try {
      const data = await getEmployees(page - 1, pageSize);
      console.log("Data received from backend:", data);
      setEmployees(data.content);
      setFilteredEmployees(data.content);
      setTotalRows(data.totalElements);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const handlePageChange = (page) => {
    console.log("Changing to page:", page);
    setPage(page);
  };

  const handlePerRowsChange = async (newPageSize, page) => {
    console.log("Changing page size to:", newPageSize, "Page:", page);
    setPageSize(newPageSize);
    setPage(1);
  };

  const sortEmployees = (employees, sortField, sortDirection) => {
    return [...employees].sort((a, b) => {
      if (a[sortField] < b[sortField]) {
        return sortDirection === 'asc' ? -1 : 1;
      }
      if (a[sortField] > b[sortField]) {
        return sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });
  };

  const searchEmployees = (employees, search, selectedField) => {
    if (!search) {
      return employees;
    }

    return employees.filter(employee => {
      if (selectedField === "all") {
        return Object.values(employee).some(value =>
          value.toString().toLowerCase().includes(search.toLowerCase())
        );
      } else {
        return employee[selectedField].toString().toLowerCase().includes(search.toLowerCase());
      }
    });
  };

  const sortAndSearchEmployees = (employees, sortField, sortDirection, search, selectedField) => {
    let sortedEmployees = sortEmployees(employees, sortField, sortDirection);
    let sortedAndSearchedEmployees = searchEmployees(sortedEmployees, search, selectedField);
    console.log("Sorted and searched employees:", sortedAndSearchedEmployees);
    return sortedAndSearchedEmployees;
  };

  const handleSelectedFieldChange = (field) => {
    setSelectedField(field);
    setSearch(""); // Reset search input when changing the field
  };

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearch(value);
    const sortedAndSearchedData = sortAndSearchEmployees(employees, sortField, sortDirection, value, selectedField);
    setFilteredEmployees(sortedAndSearchedData);
  };

  const handleSort = (column, sortDirection) => {
    setSortField(column.sortField);
    setSortDirection(sortDirection);
    const sortedAndSearchedData = sortAndSearchEmployees(employees, column.sortField, sortDirection, search, selectedField);
    setFilteredEmployees(sortedAndSearchedData);
  };

  const handleAddEmployee = () => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    // const token = sessionStorage.getItem("token");
    if (user && user.userId) {
      navigate(`/home/${user.userId}/add`);
    } else {
      navigate("/login");
    }
  };

  const handleUpdate = (employee) => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    // const token = sessionStorage.getItem("token");
    if (user && user.userId) {
      navigate(`/home/${user.userId}/update/${employee.empId}`, { state: employee });
    } else {
      navigate("/login");
    }
  };

  const handleDelete = async (employeeId) => {
    try {
      await deleteEmployee(employeeId);
      fetchEmployees();
      setSuccessMessage("Employee deleted successfully!");
      setTimeout(() => setSuccessMessage(""), 2000); 
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  const fieldDisplayNames = {
    all: "All Fields",
    empId: "EmpID",
    empName: "EmpName",
    designation: "Designation",
    department: "Department",
    joinedDate: "Joined Date",
    salary: "Salary",
    addr1: "AddressLine1",
    addr2: "AddressLine2",
    city: "City",
    state: "State",
    country: "Country",
  };

  const columns = [
    {
      name: "EmpID",
      selector: row => row.empId,
      sortable: true,
      sortField: "empId"
    },
    {
      name: "EmpName",
      selector: row => row.empName,
      sortable: true,
      sortField: "empName"
    },
    {
      name: "Designation",
      selector: row => row.designation,
      sortable: true,
      sortField: "designation"
    },
    {
      name: "Department",
      selector: row => row.department,
      sortable: true,
      sortField: "department"
    },
    {
      name: "JoinedDate",
      selector: row => row.joinedDate,
      sortable: true,
      sortField: "joinedDate",
      format: row => new Date(row.joinedDate).toLocaleDateString("en-US", {
        year: "numeric", month: "numeric", day: "numeric"
      }),
    },
    {
      name: "Salary",
      selector: row => row.salary,
      sortable: true,
      sortField: "salary"
    },
    {
      name: "AddressLine1",
      selector: row => row.addr1,
      sortable: true,
      sortField: "addr1"
    },
    {
      name: "AddressLine2",
      selector: row => row.addr2,
      sortable: true,
      sortField: "addr2"
    },
    {
      name: "City",
      selector: row => row.city,
      sortable: true,
      sortField: "city"
    },
    {
      name: "State",
      selector: row => row.state,
      sortable: true,
      sortField: "state"
    },
    {
      name: "Country",
      selector: row => row.country,
      sortable: true,
      sortField: "country"
    },
    {
      name: "Actions", cell: row => (
        <div className="d-flex justify-content-around">
          <Button color="info" onClick={() => handleUpdate(row)} style={{ marginRight: "5px" }}>
            <i className="fas fa-pencil-alt"></i>
          </Button>
          <Button color="danger" onClick={() => handleDelete(row.empId)}>
            <i className="fas fa-trash-alt"></i>
          </Button>
        </div>
      ),
    },
  ];

  // const paginatedEmployees = filteredEmployees.slice((page - 1) * pageSize, page * pageSize);
  // console.log("Paginated Employees:", paginatedEmployees);

  return (
    <div className="home-container mt-5 d-flex flex-column align-items-center" style={{ marginBottom: "100px" }}>
      <h1 className="text-center" style={{ color: "#ffc107", fontSize: "2rem", marginTop: "10px" }}>
        Employee Data
      </h1>
      {successMessage && (
        <Alert color="success" className="w-50 text-center">
          {successMessage}
        </Alert>
      )}
      <div className="d-flex justify-content-between align-items-center w-100" style={{ padding: '0 30px', marginBottom: '10px'}}>
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <Input
            type="text"
            placeholder="Search"
            value={search}
            onChange={handleSearchChange}
            style={{ width: "300px", marginRight: "5px" }}
          />
          <Dropdown isOpen={dropdownOpen} toggle={() => setDropDownOpen(!dropdownOpen)}>
            <DropdownToggle caret style={{ backgroundColor: "white", color: "black" }}>
              {fieldDisplayNames[selectedField]}
            </DropdownToggle>
            <DropdownMenu>
              {Object.keys(fieldDisplayNames).map((field) => (
                <DropdownItem key={field} onClick={() => handleSelectedFieldChange(field)}>
                  {fieldDisplayNames[field]}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>
        <Button
          color="success"
          onClick={handleAddEmployee}
        >
          <i className="fas fa-plus"></i>
        </Button>
      </div>
      <div style={{}}>
        <DataTable
          columns={columns}
          data={filteredEmployees}
          // data={paginatedEmployees}
          fixedHeader
          fixedHeaderScrollHeight="300px"
          pagination
          paginationServer
          paginationTotalRows={totalRows}
          onChangeRowsPerPage={handlePerRowsChange}
          onChangePage={handlePageChange}
          onSort={handleSort}
          sortServer
          highlightOnHover
          customStyles={{
            headCells: {
              style: {
                backgroundColor: 'black',
                color: 'white',
                fontWeight: 'bold',
              },
            },
            cells: {
              style: {
                backgroundImage: '',
                color: 'black',
              },
            },
          }}
          className="w-100"
        />
      </div>
    </div>
  );
};

export default Home;
