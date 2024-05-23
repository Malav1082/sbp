package net.javaguides.ems.repository;

import net.javaguides.ems.entity.TblEmployeeDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TblEmployeeDetailRepository extends JpaRepository<TblEmployeeDetail, Long> {
    public TblEmployeeDetail findByEmpCode(Long empCode);
}
