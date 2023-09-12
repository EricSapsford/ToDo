import datetime

users = [
    {
        "id": 1,
        "username": "demolition",
        "password": "password",
        "email": "user@demo.io",
        "first_name": "Demo",
        "last_name": "Lition",
        "created_at": datetime.datetime.now(),
        "updated_at": datetime.datetime.now()
    },
    {
        "id": 2,
        "username": "jane_doe",
        "password": "password",
        "email": "jane@gmail.com",
        "first_name": "Jane",
        "last_name": "Doe",
        "created_at": datetime.datetime.now(),
        "updated_at": datetime.datetime.now()
    },
    {
        "id": 3,
        "username": "carlosalcaraz",
        "password": "password123",
        "email": "carlos@yahoo.com",
        "first_name": "Carlos",
        "last_name": "Alcaraz",
        "created_at": datetime.datetime.now(),
        "updated_at": datetime.datetime.now()
    },
    {
        "id": 4,
        "username": "harrykane",
        "password": "secret1",
        "email": "harry@spurs.com",
        "first_name": "Harry",
        "last_name": "Kane",
        "created_at": datetime.datetime.now(),
        "updated_at": datetime.datetime.now()
    },
    {
        "id": 5,
        "username": "tomsaccount",
        "password": "mypassword",
        "email": "tom@example.com",
        "first_name": "Tom",
        "last_name": "Wambsgans",
        "created_at": datetime.datetime.now(),
        "updated_at": datetime.datetime.now()
    },
    {
        "id": 6,
        "username": "sarah_brown",
        "password": "pass123word",
        "email": "sarah@gmail.com",
        "first_name": "Sarah",
        "last_name": "Brown",
        "created_at": datetime.datetime.now(),
        "updated_at": datetime.datetime.now()
    },
    {
        "id": 7,
        "username": "crazyhorse",
        "password": "supersecurepassword",
        "email": "neil@gmail.com",
        "first_name": "Neil",
        "last_name": "Young",
        "created_at": datetime.datetime.now(),
        "updated_at": datetime.datetime.now()
    },
    {
        "id": 8,
        "username": "sonny",
        "password": "passwordpassword",
        "email": "son@spurs.com",
        "first_name": "Heung-Min",
        "last_name": "Son",
        "created_at": datetime.datetime.now(),
        "updated_at": datetime.datetime.now()
    }
]

projects = [
    {
        "id": 1,
        "name": "project1",
        "color": "Taupe",
        "view": False,
        "user_id": 1,
        "created_at": datetime.datetime.now(),
        "updated_at": datetime.datetime.now()
    },
    {
        "id": 2,
        "name": "project2",
        "color": "Green",
        "view": False,
        "user_id": 2,
        "created_at": datetime.datetime.now(),
        "updated_at": datetime.datetime.now()
    },
    {
        "id": 3,
        "name": "project3",
        "color": "Teal",
        "view": False,
        "user_id": 3,
        "created_at": datetime.datetime.now(),
        "updated_at": datetime.datetime.now()
    },
    {
        "id": 4,
        "name": "project4",
        "color": "Red",
        "view": False,
        "user_id": 4,
        "created_at": datetime.datetime.now(),
        "updated_at": datetime.datetime.now()
    },
    {
        "id": 5,
        "name": "project5",
        "color": "Salmon",
        "view": False,
        "user_id": 5,
        "created_at": datetime.datetime.now(),
        "updated_at": datetime.datetime.now()
    },
    {
        "id": 6,
        "name": "project6",
        "color": "Lavender",
        "view": False,
        "user_id": 6,
        "created_at": datetime.datetime.now(),
        "updated_at": datetime.datetime.now()
    },
    {
        "id": 7,
        "name": "project7",
        "color": "SkyBlue",
        "view": False,
        "user_id": 7,
        "created_at": datetime.datetime.now(),
        "updated_at": datetime.datetime.now()
    },
    {
        "id": 8,
        "name": "project8",
        "color": "LightBlue",
        "view": False,
        "user_id": 8,
        "created_at": datetime.datetime.now(),
        "updated_at": datetime.datetime.now()
    },
    {
        "id": 9,
        "name": "project9",
        "color": "Magenta",
        "view": False,
        "user_id": 1,
        "created_at": datetime.datetime.now(),
        "updated_at": datetime.datetime.now()
    },
    {
        "id": 10,
        "name": "project10",
        "color": "Yellow",
        "view": False,
        "user_id": 1,
        "created_at": datetime.datetime.now(),
        "updated_at": datetime.datetime.now()
    },
    {
        "id": 11,
        "name": "project11",
        "color": "BerryRed",
        "view": False,
        "user_id": 1,
        "created_at": datetime.datetime.now(),
        "updated_at": datetime.datetime.now()
    },
    {
        "id": 12,
        "name": "project12",
        "color": "Charcoal",
        "view": False,
        "user_id": 1,
        "created_at": datetime.datetime.now(),
        "updated_at": datetime.datetime.now()
    },
    {
        "id": 13,
        "name": "project13",
        "color": "Grey",
        "view": False,
        "user_id": 3,
        "created_at": datetime.datetime.now(),
        "updated_at": datetime.datetime.now()
    },
    {
        "id": 14,
        "name": "project14",
        "color": "Violet",
        "view": False,
        "user_id": 4,
        "created_at": datetime.datetime.now(),
        "updated_at": datetime.datetime.now()
    },
]

tasks = [
    {
        "id": 1,
        "name": "task1",
        "description": "description of task1",
        "labels": "Priority,Today,custom1",
        "status": True,
        "project_id": 1,
        "section_id": None,
        "created_at": datetime.datetime.now(),
        "updated_at": datetime.datetime.now()
    },
    {
        "id": 2,
        "name": "task2",
        "description": "description of task2",
        "labels": "Priority,Today,custom2",
        "status": True,
        "project_id": 1,
        "section_id": None,
        "created_at": datetime.datetime.now(),
        "updated_at": datetime.datetime.now()
    },
    {
        "id": 3,
        "name": "task3",
        "description": "description of task3",
        "labels": "Priority,Today,custom3",
        "status": True,
        "project_id": 1,
        "section_id": None,
        "created_at": datetime.datetime.now(),
        "updated_at": datetime.datetime.now()
    },
    {
        "id": 4,
        "name": "task4",
        "description": "description of task4",
        "labels": "Priority,Today,custom4",
        "status": True,
        "project_id": 1,
        "section_id": None,
        "created_at": datetime.datetime.now(),
        "updated_at": datetime.datetime.now()
    },
    {
        "id": 5,
        "name": "task5",
        "description": "description of task5",
        "labels": "Priority,Today,custom5",
        "status": True,
        "project_id": 1,
        "section_id": None,
        "created_at": datetime.datetime.now(),
        "updated_at": datetime.datetime.now()
    },
    {
        "id": 6,
        "name": "task6",
        "description": "description of task6",
        "labels": "Priority,Today,custom6",
        "status": True,
        "project_id": 1,
        "section_id": None,
        "created_at": datetime.datetime.now(),
        "updated_at": datetime.datetime.now()
    },
    {
        "id": 7,
        "name": "task7",
        "description": "description of task7",
        "labels": "Priority,Today,custom7",
        "status": True,
        "project_id": 1,
        "section_id": None,
        "created_at": datetime.datetime.now(),
        "updated_at": datetime.datetime.now()
    },
    {
        "id": 8,
        "name": "task8",
        "description": "description of task8",
        "labels": "Priority,Today,custom8",
        "status": True,
        "project_id": 2,
        "section_id": None,
        "created_at": datetime.datetime.now(),
        "updated_at": datetime.datetime.now()
    },
    {
        "id": 9,
        "name": "task9",
        "description": "description of task9",
        "labels": "Priority,Today,custom9",
        "status": True,
        "project_id": 2,
        "section_id": None,
        "created_at": datetime.datetime.now(),
        "updated_at": datetime.datetime.now()
    },
    {
        "id": 10,
        "name": "task10",
        "description": "description of task10",
        "labels": "Priority,Today,custom10",
        "status": True,
        "project_id": 2,
        "section_id": None,
        "created_at": datetime.datetime.now(),
        "updated_at": datetime.datetime.now()
    },
    {
        "id": 11,
        "name": "task11",
        "description": "description of task11",
        "labels": "Priority,Today,custom11",
        "status": True,
        "project_id": 2,
        "section_id": None,
        "created_at": datetime.datetime.now(),
        "updated_at": datetime.datetime.now()
    },
    {
        "id": 12,
        "name": "task12",
        "description": "description of task12",
        "labels": "Priority,Today,custom12",
        "status": True,
        "project_id": 3,
        "section_id": None,
        "created_at": datetime.datetime.now(),
        "updated_at": datetime.datetime.now()
    },
    {
        "id": 13,
        "name": "task13",
        "description": "description of task13",
        "labels": "Priority,Today,custom13",
        "status": True,
        "project_id": 3,
        "section_id": None,
        "created_at": datetime.datetime.now(),
        "updated_at": datetime.datetime.now()
    },
    {
        "id": 14,
        "name": "task14",
        "description": "description of task14",
        "labels": "Priority,Today,custom14",
        "status": True,
        "project_id": 4,
        "section_id": None,
        "created_at": datetime.datetime.now(),
        "updated_at": datetime.datetime.now()
    },
    {
        "id": 15,
        "name": "task15",
        "description": "description of task15",
        "labels": "Priority,Today,custom15",
        "status": True,
        "project_id": 4,
        "section_id": None,
        "created_at": datetime.datetime.now(),
        "updated_at": datetime.datetime.now()
    },
    {
        "id": 16,
        "name": "task16",
        "description": "description of task16",
        "labels": "Priority,Today,custom16",
        "status": True,
        "project_id": 1,
        "section_id": None,
        "created_at": datetime.datetime.now(),
        "updated_at": datetime.datetime.now()
    },
    {
        "id": 17,
        "name": "task17",
        "description": "description of task17",
        "labels": "Priority,Today,custom17",
        "status": True,
        "project_id": 5,
        "section_id": None,
        "created_at": datetime.datetime.now(),
        "updated_at": datetime.datetime.now()
    },
    {
        "id": 18,
        "name": "task18",
        "description": "description of task18",
        "labels": "Priority,Today,custom18",
        "status": True,
        "project_id": 6,
        "section_id": None,
        "created_at": datetime.datetime.now(),
        "updated_at": datetime.datetime.now()
    },
    {
        "id": 19,
        "name": "task19",
        "description": "description of task19",
        "labels": "Priority,Today,custom19",
        "status": True,
        "project_id": 1,
        "section_id": None,
        "created_at": datetime.datetime.now(),
        "updated_at": datetime.datetime.now()
    },
    {
        "id": 20,
        "name": "task20",
        "description": "description of task20",
        "labels": "Priority,Today,custom20",
        "status": True,
        "project_id": 1,
        "section_id": None,
        "created_at": datetime.datetime.now(),
        "updated_at": datetime.datetime.now()
    },
]

# sections = [
#     {
#         "id": 1,
#         "name": "section1",
#         "project_id": 1,
#         "created_at": datetime.datetime.now(),
#         "updated_at": datetime.datetime.now()
#     }
# ]