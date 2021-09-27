package com.pi.chapter;

import javax.annotation.Generated;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

/**
 * Generated routes are based on the OpenAPI document in src/generated/api folder.
 *
 * @author Maven Archetype (camel-oas-archetype)
 */
@Generated("com.ms3_inc.camel.archetype.oas")
@Component
public class RoutesGenerated extends BaseRestRouteBuilder{
    private final String contextPath;

    public RoutesGenerated(@Value("${camel.rest.context-path}") String contextPath) {
        super();
        this.contextPath = contextPath;
    }

    /**
     * Defines Apache Camel routes using the OpenAPI REST DSL.
     * Routes are built using a get(PATH) rest message processor.
     *
     * Make changes to this file with caution.
     * If the API specification changes and this file is regenerated,
     * previous changes may be overwritten.
     */
    @Override
    public void configure() throws Exception {
        super.configure();

		restConfiguration().component("jetty").producerComponent("netty-http");

//		interceptFrom()
//			.process(new OpenApi4jValidator("pi-chapter-api.yaml", contextPath));

		rest()
			.get("/brothers")
				.id("get-brothers")
				.produces("application/json")
				.to(direct("get-brothers").getUri())
			.post("/brothers")
				.id("post-brothers")
				.consumes("application/json")
				.produces("application/json")
				.to(direct("post-brother").getUri())
			.get("/brothers/{brotherId}")
				.id("get-brothers-brotherId")
				.produces("application/json")
				.to(direct("get-brothers-brotherId").getUri())
			.patch("/brothers/{brotherId}")
				.id("patch-brothers-brotherId")
				.consumes("application/json")
				.produces("application/json")
				.to(direct("patch-brothers-brotherId").getUri())
			.delete("/brothers/{brotherId}")
				.id("delete-brothers-brotherId")
				.produces("application/json")
				.to(direct("delete-brothers-brotherId").getUri())

			.get("/roles")
				.id("get-roles")
				.produces("application/json")
				.to(direct("get-roles").getUri())
			.post("/roles")
				.id("post-roles")
				.consumes("application/json")
				.produces("application/json")
				.to(direct("post-role").getUri())
			.get("/roles/{roleId}")
				.id("get-roles-roleId")
				.produces("application/json")
				.to(direct("get-roles-roleId").getUri())
			.delete("/roles/{roleId}")
				.id("delete-roles-roleId")
				.produces("application/json")
				.to(direct("delete-roles-roleId").getUri())
		;

    }
}
