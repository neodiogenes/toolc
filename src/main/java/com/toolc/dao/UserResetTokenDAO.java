package com.toolc.dao;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.toolc.model.ApplicationUser;
import com.toolc.model.UserResetToken;

@Repository
public interface UserResetTokenDAO extends JpaRepository<UserResetToken, UUID> {
    List<UserResetToken> findAllByUserAndArchived(ApplicationUser user, boolean archived);
}
