package com.cusoc.accessaudit;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

@SpringBootTest(classes = AccessAuditApplication.class)
@ActiveProfiles("test")
class AccessAuditApplicationTests {

    @Test
    void contextLoads() {
        // Verify application context boots up successfully
    }
}
