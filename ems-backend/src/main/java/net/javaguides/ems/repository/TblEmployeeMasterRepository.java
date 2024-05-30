package net.javaguides.ems.repository;

import net.javaguides.ems.entity.TblEmployeeMaster;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface TblEmployeeMasterRepository extends JpaRepository<TblEmployeeMaster, Long> {
    TblEmployeeMaster findByEmpId(String empId);
    boolean existsByEmpId(String empId);

//    @Query("SELECT m FROM TblEmployeeMaster m LEFT JOIN TblEmployeeDetail d ON m.mastCode = d.empCode WHERE m.empName LIKE %:search% ORDER BY CASE WHEN :sortField = 'addr1' THEN d.addr1 END ASC, CASE WHEN :sortField = 'addr1' THEN d.addr1 END DESC, CASE WHEN :sortField = 'addr2' THEN d.addr2 END ASC, CASE WHEN :sortField = 'addr2' THEN d.addr2 END DESC, CASE WHEN :sortField = 'city' THEN d.city END ASC, CASE WHEN :sortField = 'city' THEN d.city END DESC, CASE WHEN :sortField = 'state' THEN d.state END ASC, CASE WHEN :sortField = 'state' THEN d.state END DESC, CASE WHEN :sortField = 'country' THEN d.country END ASC, CASE WHEN :sortField = 'country' THEN d.country END DESC")
//    Page<TblEmployeeMaster> findByEmpNameContainingIgnoreCaseAndSorted(@Param("search") String search, @Param("sortField") String sortField, Pageable pageable);
}
