INSERT INTO departments (department_name)
VALUES ('marketing'), ('reservations');

INSERT INTO roles (role_name, salary, department_id)
VALUES ('reservations agent', '50000', '2'), ('sales and marketing manager', '104000', '1');

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES 
('Amanda', 'Fermor', '1', '2'), 
('Yasmin', 'Robinson', '1', '2'), 
('Bastian', 'Graff', '2', '0');