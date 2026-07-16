package com.cusoc.accessaudit.repository;

import com.cusoc.accessaudit.entity.FeedbackSession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FeedbackSessionRepository extends JpaRepository<FeedbackSession, Long> {
}
