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
}