# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...


commands
1) create the project
    `rails new rail-sample-app -d postgresql --skip-action-mailbox --skip-action-text --skip-spring --webpack=react -T --skip-turbolink`
2) configure your database.yml acordingly to your docker-compose
3) generate basic models
	`
	rails g model Product cod:string name:string price:decimal --force
	rails g model Client ruc:string name:string phonenumber:string email:string address:string --force
	rails g model Invoice invoicenumber:string total:decimal client:references --force
	rails g model InvoiceDetail invoice:references product:references cod:string cant:integer price:decimal --force
	`
4) create the database and tables
    `rails db:create db:migrate db:seed`
5) add graphql
    `bundle add graphql`
6) setup grapqhl
    `rails generate graphql:install`
