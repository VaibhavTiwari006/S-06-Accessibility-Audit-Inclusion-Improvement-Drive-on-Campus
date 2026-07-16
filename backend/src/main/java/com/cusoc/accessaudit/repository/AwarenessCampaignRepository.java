package com.cusoc.accessaudit.repository;

import com.cusoc.accessaudit.entity.AwarenessCampaign;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AwarenessCampaignRepository extends JpaRepository<AwarenessCampaign, Long> {
}
