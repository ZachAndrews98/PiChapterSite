package com.pi.chapter;

import com.datasonnet.document.MediaTypes;
import org.apache.camel.Exchange;
import org.apache.camel.component.netty.http.NettyHttpOperationFailedException;
import org.springframework.stereotype.Component;


/**
 * The RoutesImplementation class holds implementations for the end points configured in RoutesGenerated.
 * These routes are based on operation Ids, that correspond to an API end point:  method+path.
 *
 * @author Maven Archetype (camel-openapi-archetype)
 */
@Component
public class RoutesImplementation extends BaseRestRouteBuilder {
    @Override
    public void configure() throws Exception {
        super.configure();

        onException(NettyHttpOperationFailedException.class)
                .routeId("netty-exception-policy")
                .continued(true)
        ;

        // TODO: Replace stubs for each endpoint with real implementation.  Implementation defaults to a simple response with operation Id.
        from(direct("get-brothers"))
                .routeId("direct:get-brothers")
//                .setProperty("firstName", simple("${header.firstName}"))
//                .to(direct("setup-query-params"))
                .to(sql("classpath:/sql/brothers/get-brothers.sql"))
                .transform(datasonnetEx("resource:classpath:/format-get-brothers.ds", String.class)
                        .bodyMediaType(MediaTypes.APPLICATION_JAVA)
                        .outputMediaType(MediaTypes.APPLICATION_JSON))
                .setHeader(Exchange.HTTP_RESPONSE_CODE, constant(200))
        ;

        from(direct("post-brother"))
                .routeId("direct:post-brother")
//                .setBody(constant("POST"))
                .to(direct("setup-request-body"))
                .to(sql("classpath:/sql/brothers/post-brother.sql"))
                .setHeader(Exchange.HTTP_RESPONSE_CODE, constant(201))
        ;


        from(direct("get-brothers-brotherId"))
                .routeId("direct:get-brothers-brotherId")
                .to(sql("classpath:/sql/brothers/get-brother-by-id.sql"))
                .choice()
                    .when(datasonnetEx("ds.sizeOf(payload) < 1"))
                        .setBody(constant("{ \"message\": \"Brother Not Found\" }"))
                        .setHeader(Exchange.HTTP_RESPONSE_CODE, constant(404))
                    .otherwise()
                        .transform(datasonnetEx("resource:classpath:/format-get-brother.ds", String.class)
                                .bodyMediaType(MediaTypes.APPLICATION_JAVA)
                                .outputMediaType(MediaTypes.APPLICATION_JSON))
                        .setHeader(Exchange.HTTP_RESPONSE_CODE, constant(200))
        ;


        from(direct("patch-brothers-brotherId"))
                .routeId("direct:patch-brothers-brotherId")
                .transform(datasonnetEx("resource:classpath:/format-patch-request.ds"))
                .to(direct("setup-request-body"))
                .to(sql("classpath:/sql/brothers/patch-brother.sql"))
                .setHeader(Exchange.HTTP_RESPONSE_CODE, constant(200))
                .setBody(constant("{\"message\": \"Patch Successful\""))
        ;


        from(direct("delete-brothers-brotherId"))
                .routeId("direct:delete-brothers-brotherId")
                .to(sql("classpath:/sql/brothers/delete-brother.sql"))
                .setHeader(Exchange.HTTP_RESPONSE_CODE, constant(204))
        ;


        from(direct("get-roles"))
                .routeId("direct:get-roles")
                .to(sql("classpath:/sql/roles/get-roles.sql"))
                .transform(datasonnetEx("resource:classpath:/format-get-roles.ds", String.class)
                        .bodyMediaType(MediaTypes.APPLICATION_JAVA)
                        .outputMediaType(MediaTypes.APPLICATION_JSON))
                .setHeader(Exchange.HTTP_RESPONSE_CODE, constant(200))
        ;

        from(direct("post-role"))
                .routeId("direct:post-role")
                .setProperty("name", datasonnetEx("payload.name", String.class))
                .to(sql("classpath:/sql/roles/post-role.sql"))
                .setHeader(Exchange.HTTP_RESPONSE_CODE, constant(201))
        ;


        from(direct("get-roles-roleId"))
                .routeId("direct:get-roles-roleId")
                .to(sql("classpath:/sql/roles/get-role.sql"))
                .transform(datasonnetEx("resource:classpath:/format-get-roles.ds", String.class)
                        .bodyMediaType(MediaTypes.APPLICATION_JAVA)
                        .outputMediaType(MediaTypes.APPLICATION_JSON))
                .setHeader(Exchange.HTTP_RESPONSE_CODE, constant(200))
        ;


        from(direct("delete-roles-roleId"))
                .routeId("direct:delete-roles-roleId")
                .to(sql("classpath:/sql/roles/delete-role.sql"))
                .setHeader(Exchange.HTTP_RESPONSE_CODE, constant(204))
        ;


        from(direct("setup-request-body"))
                .routeId("direct:setup-request-body")
                .setProperty("firstName", datasonnetEx("payload.firstName", String.class))
                .setProperty("lastName", datasonnetEx("payload.lastName", String.class))
                .setProperty("email", datasonnetEx("payload.email", String.class))
                .setProperty("phone", datasonnetEx("payload.phone", String.class))
                .setProperty("gradYear", datasonnetEx("payload.gradYear", String.class))
                .setProperty("major", datasonnetEx("payload.major", String.class))
                .setProperty("minor", datasonnetEx("payload.minor", String.class))
                .setProperty("roleId", datasonnetEx("payload.roleId", Integer.class))
        ;

//        from(direct("setup-query-params"))
//                .transform(datasonnetEx("resource:classpath:/setup-query-params.ds"))
//                .setProperty("firstName", datasonnetEx("payload.firstName", String.class))
//                .setProperty("lastName", datasonnetEx("payload.lastName", String.class))
//                .setProperty("gradYear", datasonnetEx("payload.gradYear", String.class))
//                .setProperty("major", datasonnetEx("payload.major", String.class))
//                .setProperty("minor", datasonnetEx("payload.minor", String.class))
//                .setProperty("rank", datasonnetEx("payload.rank", String.class))
//                .setProperty("role", datasonnetEx("payload.role", String.class))
//                .choice()
//                    .when(datasonnetEx("payload.role != '%'"))
//                        .to(sql("SELECT role_id FROM roles WHERE name LIKE :#${exchangeProperty.role}"))
//                .end()
//                .setProperty("roleId", datasonnetEx("payload[0]"))
//        ;
    }
}
