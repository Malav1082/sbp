package net.javaguides.ems.repository;

import net.javaguides.ems.entity.TblEmployeeMaster;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TblEmployeeMasterRepository extends JpaRepository<TblEmployeeMaster, Long> {
}
