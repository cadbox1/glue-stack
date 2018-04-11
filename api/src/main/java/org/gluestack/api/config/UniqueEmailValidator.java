package org.gluestack.api.config;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import org.gluestack.api.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UniqueEmailValidator implements ConstraintValidator<UniqueEmailConstraint, String> {

    @Autowired
    private UserRepository userRepository;

    @Override
    public void initialize(UniqueEmailConstraint email) {
    }

    @Override
    public boolean isValid(String email, ConstraintValidatorContext cxt) {
        return userRepository.findOneByEmail(email) == null;
    }

}