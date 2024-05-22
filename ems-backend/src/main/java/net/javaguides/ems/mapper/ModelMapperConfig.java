//package net.javaguides.ems.mapper;
//
//import net.javaguides.ems.dto.EmployeeDto;
//import net.javaguides.ems.entity.TblEmployeeDetail;
//import net.javaguides.ems.entity.TblEmployeeMaster;
//import org.modelmapper.ModelMapper;
//import org.modelmapper.convention.MatchingStrategies;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//
//@Configuration
//public class ModelMapperConfig {
//
//    @Bean
//    public ModelMapper modelMapper() {
//        ModelMapper modelMapper = new ModelMapper();
//        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
//
//        // Custom mappings if necessary
//        modelMapper.createTypeMap(EmployeeDto.class, TblEmployeeMaster.class)
//                .addMappings(mapper -> mapper.skip(TblEmployeeMaster::setMastCode)); // Assuming mastCode is auto-generated
//
////        modelMapper.createTypeMap(EmployeeDto.class, TblEmployeeDetail.class)
////                .addMappings(mapper -> mapper.map(src -> src.getEmpId(), TblEmployeeDetail::setEmpCode)); // Map EmpCode from DTO
//
//        return modelMapper;
//    }
//}
