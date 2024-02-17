CREATE TABLE hotels (
hotel_id SERIAL PRIMARY KEY,
name VARCHAR NOT NULL,
phone VARCHAR NOT NULL,
address VARCHAR NOT NULL,
rating INTEGER NOT NULL
);



INSERT INTO hotels (name, phone, address, rating ) VALUES ('Hilton', '(39) 98566-1222', '1st avenue, Chicago', 4);
INSERT INTO hotels (name, phone, address, rating ) VALUES ('Plaza', '(39) 98566-12278', '3rd avenue, Michigan', 3);
INSERT INTO hotels (name, phone, address, rating ) VALUES ('Roma', '(39) 98566-1256', 'Main Street, Ohio', 5);
INSERT INTO hotels (name, phone, address, rating ) VALUES ('Paris', '(39) 98566-1442', 'Main Boulevard, NY', 4);
INSERT INTO hotels (name, phone, address, rating ) VALUES ('Boulevard', '(39) 98566-1333', 'Cedar Lake street, Carbondale', 3);
INSERT INTO hotels (name, phone, address, rating ) VALUES ('Hilton 2', '(39) 98566-1222', '1st avenue, Chicago', 4);
INSERT INTO hotels (name, phone, address, rating ) VALUES ('Plaza 2', '(39) 98566-12278', '3rd avenue, Michigan', 3);
INSERT INTO hotels (name, phone, address, rating ) VALUES ('Roma 2', '(39) 98566-1256', 'Main Street, Ohio', 5);
INSERT INTO hotels (name, phone, address, rating ) VALUES ('Paris 2', '(39) 98566-1442', 'Main Boulevard, NY', 4);
INSERT INTO hotels (name, phone, address, rating ) VALUES ('Boulevard 2', '(39) 98566-1333', 'Cedar Lake street, Carbondale', 3);

CREATE TABLE rooms (
room_id SERIAL PRIMARY KEY,
type VARCHAR NOT NULL,
daily_rent DOUBLE PRECISION NOT NULL,
hotel_id INTEGER   NOT NULL,
CONSTRAINT fk_hotels FOREIGN KEY (hotel_id) REFERENCES hotels (hotel_id)
);

INSERT INTO rooms (type, hotel_id, daily_rent) VALUES ('Double',  1, 200);
INSERT INTO rooms (type, hotel_id, daily_rent) VALUES ('Double',  2, 300);
INSERT INTO rooms (type, hotel_id, daily_rent) VALUES ('standard',  3, 100);
INSERT INTO rooms (type, hotel_id, daily_rent) VALUES ('Double',  4, 150);
INSERT INTO rooms (type, hotel_id, daily_rent) VALUES ('standard',  5, 80);
INSERT INTO rooms (type, hotel_id, daily_rent) VALUES ('Double',  5, 200);
INSERT INTO rooms (type, hotel_id, daily_rent) VALUES ('Double',  4, 300);
INSERT INTO rooms (type, hotel_id, daily_rent) VALUES ('standard',  2, 100);
INSERT INTO rooms (type, hotel_id, daily_rent) VALUES ('Double',  3, 150);
INSERT INTO rooms (type, hotel_id, daily_rent) VALUES ('standard',  1, 80);
INSERT INTO rooms (type, hotel_id, daily_rent) VALUES ('Double',  1, 200);
INSERT INTO rooms (type, hotel_id, daily_rent) VALUES ('Double',  2, 300);
INSERT INTO rooms (type, hotel_id, daily_rent) VALUES ('standard',  3, 100);
INSERT INTO rooms (type, hotel_id, daily_rent) VALUES ('Double',  4, 150);
INSERT INTO rooms (type, hotel_id, daily_rent) VALUES ('standard',  5, 80);
INSERT INTO rooms (type, hotel_id, daily_rent) VALUES ('Double',  5, 200);
INSERT INTO rooms (type, hotel_id, daily_rent) VALUES ('Double',  4, 300);
INSERT INTO rooms (type, hotel_id, daily_rent) VALUES ('standard',  2, 100);
INSERT INTO rooms (type, hotel_id, daily_rent) VALUES ('Double',  3, 150);
INSERT INTO rooms (type, hotel_id, daily_rent) VALUES ('standard',  1, 80);


CREATE TABLE public.users (
    user_id uuid PRIMARY KEY NOT NULL,
    first_name character varying(255) NOT NULL,
    last_name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    phone character varying(255) NOT NULL,
    role character varying(255) NOT NULL,
    refresh_token character varying(255) DEFAULT 'NOT ISSUED' NOT NULL ,
);

INSERT INTO public.users (user_id, first_name, last_name, email, password, phone, role) VALUES ("195bfa8f-e6d6-4911-938c-8ef23aaba157","Fabio 2","Ferreira","fabio2.ferreira@email.com","$2b$10$TIpSNxZ3mZZJoEAlavWx6eY.608pzzSYrVwTFuTyNqcF2/6yKAf0W","(39) 98566-4556","customer");
INSERT INTO public.users (user_id, first_name, last_name, email, password, phone, role) VALUES ("27d7f819-8388-46dd-8298-96fd8470bd93","Angelo 2","Ferreira","angelo2.ferreira@email.com","$2b$10$Sra4QaC4nMEo2XhtzNi7geTHJJVpLF0iDeH6x3q1l2BK0gt.yYZcW","(39) 98566-4556","manager");
INSERT INTO public.users (user_id, first_name, last_name, email, password, phone, role) VALUES ("65d3157e-abbd-44b4-b2fb-0c328f33f6e8","Maria 2","ferreira","maia2.ferreira@email.com","$2b$10$9VNt/jQ1fwfKUqxsXB6IQuvsy2Yuv9wKAl/Wu03nsnyLakfETFQH6","(39) 98566-4556","admin");


CREATE TABLE public.reservations (
    reservation_id SERIAL PRIMARY KEY,
    checkin date NOT NULL,
    checkout date NOT NULL,
    total_rent double precision NOT NULL,
    number_of_guests integer NOT NULL,
    room_id integer,
    user_id uuid,
CONSTRAINT fk_rooms FOREIGN KEY (room_id) REFERENCES rooms (room_id),
CONSTRAINT fk_users FOREIGN KEY (user_id) REFERENCES users (user_id)
);

INSERT INTO public.reservations ( checkin, checkout, total_rent, number_of_guests, room_id, user_id) VALUES ('2020-12-05', '2020-12-07', 400, 2, 1, '27d7f819-8388-46dd-8298-96fd8470bd93');
INSERT INTO public.reservations ( checkin, checkout, total_rent, number_of_guests, room_id, user_id) VALUES ('2020-12-15', '2020-12-17', 600, 2, 2, '65d3157e-abbd-44b4-b2fb-0c328f33f6e8');
INSERT INTO public.reservations ( checkin, checkout, total_rent, number_of_guests, room_id, user_id) VALUES ('2020-12-25', '2020-12-27', 600, 2, 2, '195bfa8f-e6d6-4911-938c-8ef23aaba157');
