package net.javaguides.ems.repository;

import net.javaguides.ems.entity.TblUserMaster;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TblUserMasterRepository extends JpaRepository<TblUserMaster, Long> {
    public TblUserMaster findByName(String name);
    public TblUserMaster findByNameAndPassword(String name, String password);
//    Optional<TblUserMaster> findByUsername(String username);
}
