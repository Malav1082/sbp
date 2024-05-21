package net.javaguides.ems.service;

import net.javaguides.ems.entity.TblUserMaster;
import net.javaguides.ems.repository.TblUserMasterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TblUserMasterService {

    @Autowired
    private TblUserMasterRepository tblUserMasterRepository;

    public TblUserMaster addUser(TblUserMaster tblUserMaster) {
        return tblUserMasterRepository.save(tblUserMaster);
    }

    public TblUserMaster getUserByE(TblUserMaster tblUserMaster) {
        return tblUserMasterRepository.findByName(tblUserMaster.getName());
    }

    public TblUserMaster getUserByEP(String name, String password) {
        TblUserMaster user = null;

        try {
            user = this.tblUserMasterRepository.findByNameAndPassword(name, password);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return user;
    }

    public void updateUser(TblUserMaster tblUserMaster, int userid) {
        TblUserMaster u =
                this.tblUserMasterRepository.findByNameAndPassword(
                        tblUserMaster.getName(),
                        tblUserMaster.getPassword()
                );
    }

    public boolean resetPassword(
            String name,
            String password,
            String new_password
    ) {
        TblUserMaster u = this.tblUserMasterRepository.findByNameAndPassword(name, password);

        if (u != null) {
            u.setPassword(new_password);
            tblUserMasterRepository.save(u);
            return true;
        } else {
            return false;
        }
    }

    public boolean forgotPassword(String name, String new_password) {
        TblUserMaster u = tblUserMasterRepository.findByName(name);

        if (u != null) {
            u.setPassword(new_password);
            tblUserMasterRepository.save(u);
            return true;
        } else {
            return false;
        }
    }

}