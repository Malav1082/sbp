import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import { Button, Input, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
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
  const [selectedSearchProperty, setSelectedSearchProperty] = useState("empName");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Home";
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const data = await getEmployees();
      setEmployees(data);
      setFilteredEmployees(data);
      setTotalRows(data.length);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const handleSearchChange = (event) => {
    const value = event.target.value.toLowerCase();
    setSearch(value);
    filterAndSortEmployees(value, sortField, sortDirection);
    setPage(1);
  };

  const handleSort = (column, sortDirection) => {
    setSortField(column.sortField);
    setSortDirection(sortDirection);
    filterAndSortEmployees(search, column.sortField, sortDirection);
  };

  const filterAndSortEmployees = (search, sortField, sortDirection) => {
    let filtered = employees.filter(employee => {
      return Object.keys(employee).some(key =>
        employee[key].toString().toLowerCase().includes(search)
      );
    });

    const sorted = filtered.sort((a, b) => {
      if (a[sortField] < b[sortField]) {
        return sortDirection === 'asc' ? -1 : 1;
      }
      if (a[sortField] > b[sortField]) {
        return sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });

    setFilteredEmployees(sorted);
    setTotalRows(sorted.length);
  };

  const handlePageChange = (page) => {
    setPage(page);
  };

  const handlePerRowsChange = async (newPageSize, page) => {
    setPageSize(newPageSize);
    setPage(page);
  };

  const handleAddEmployee = () => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (user && user.userId) {
      navigate(`/home/${user.userId}/add`);
    } else {
      navigate("/login");
    }
  };

  const handleUpdate = (employee) => {
    const user = JSON.parse(sessionStorage.getItem("user"));
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
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
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

  const paginatedEmployees = filteredEmployees.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="home-container mt-5 d-flex flex-column align-items-center" style={{ marginBottom: "100px" }}>
      <div className="d-flex justify-content-between align-items-center mb-4" style={{ width: "100%" }}>
        <h1 className="text-center" style={{ marginTop: '20px', color: "#ffc107", fontSize: "2rem", marginLeft: '570px' }}>
          Employee Data
        </h1>
        <Button
          color="success"
          onClick={handleAddEmployee}
          style={{ marginLeft: 'auto', marginTop: '20px', marginRight: '110px' }}
        >
          <i className="fas fa-plus"></i>
        </Button>
      </div>
      <div style={{ marginBottom: "20px" }}>
        <Input
          type="text"
          placeholder="Search"
          value={search}
          onChange={handleSearchChange}
          style={{ marginBottom: "10px", width: "300px" }}
        />
        {/* <Dropdown isOpen={dropdownOpen} toggle={() => setDropdownOpen(!dropdownOpen)}>
          <DropdownToggle caret>
            Search Property
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem onClick={() => setSelectedSearchProperty("empId")}>EmpId</DropdownItem>
            <DropdownItem onClick={() => setSelectedSearchProperty("empName")}>EmpName</DropdownItem>
            <DropdownItem onClick={() => setSelectedSearchProperty("designation")}>Designation</DropdownItem>
            <DropdownItem onClick={() => setSelectedSearchProperty("department")}>Department</DropdownItem>
            <DropdownItem onClick={() => setSelectedSearchProperty("joinedDate")}>JoinedDate</DropdownItem>
            <DropdownItem onClick={() => setSelectedSearchProperty("salary")}>Salary</DropdownItem>
            <DropdownItem onClick={() => setSelectedSearchProperty("addr1")}>Address Line 1</DropdownItem>
            <DropdownItem onClick={() => setSelectedSearchProperty("addr2")}>Address Line 2</DropdownItem>
            <DropdownItem onClick={() => setSelectedSearchProperty("city")}>City</DropdownItem>
            <DropdownItem onClick={() => setSelectedSearchProperty("state")}>State</DropdownItem>
            <DropdownItem onClick={() => setSelectedSearchProperty("country")}>Country</DropdownItem>
          </DropdownMenu>
        </Dropdown> */}
      </div>
      <DataTable
        columns={columns}
        data={paginatedEmployees} // Use paginated data
        pagination
        paginationServer
        paginationTotalRows={totalRows}
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
        onSort={handleSort}
        sortServer
        highlightOnHover
      />
    </div>
  );
};

export default Home;