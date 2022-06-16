FROM mariadb:latest

ENV MYSQL_DATABASE piChapter
ENV MYSQL_ROOT_PASSWORD root
ENV MYSQL_USER zach
ENV MYSQL_PASSWORD toor

COPY ./schema/setup.sql /docker-entrypoint-initdb.d/