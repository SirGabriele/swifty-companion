export interface User {
    "email": string,
    "login": string,
    "first_name": string,
    "last_name": string,
    "phone": string,
    "image": {
        "link": string,
        "versions": {
            "large": string,
            "medium": string,
            "small": string,
            "micro": string
        }
    },
    "wallet": number,
    "cursus_users": [
        {
            "id": number,
            "begin_at": string,
            "end_at": string,
            "grade": string,
            "level": number,
            "skills": [],
            "cursus_id": number,
            "has_coalition": true,
            "user": {
                "id": number,
                "login": string,
                "url": string
            },
            "cursus": {
                "id": number,
                "created_at": string,
                "name": string,
                "slug": string
            }
        }
    ],
    "projects_users": {
        "id": number,
        "cursus_ids": number[],
        "marked": boolean,
        "final_mark": number,
        "name": string,
        "project": {
            "name": string
        }
        "status": string,
        "validated?": boolean
    }[],
    "campus": [
        {
            "name": string
        }
    ],
}

export interface ProjectInfo {
    "id": number,
    "marked": boolean,
    "final_mark": number,
    "name": string,
    "validated?": boolean
}

export interface SkillInfo {
    "id": number,
    "level": number,
    "name": string
}