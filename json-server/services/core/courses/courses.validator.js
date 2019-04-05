function validateCourse(course) {
    if (!course) {
        return false;
    }

    const mandatoryFields = ['title', 'creationDate', 'duration', 'description', 'topRated'];
    const optionalFields = ['authors', 'id'];
    const allFields = mandatoryFields.concat(optionalFields);

    if (isIncorrectKeyInObj(course, allFields)) {
        return false;
    }

    const courseValidators = {
        id: validateId,
        title: validateTitle,
        creationDate: validateCreationDate,
        duration: validateDuration,
        description: validateDescription,
        topRated: validateTopRated,
        authors: validateAuthors
    };

    const notValidated = allFields.some((field) => {
        if (mandatoryFields.includes(field) && !course[field]) {
            return true;
        }

        return !courseValidators[field](course[field]);
    });

    return !notValidated;
}

function validateTitle(title) {
    return title && typeof title === 'string';
}

function validateCreationDate(creationDate) {
    return creationDate &&
           typeof creationDate === 'number' &&
           creationDate < Date.now();
}

function validateDuration(duration) {
    return duration && typeof duration === 'number';
}

function validateDescription(description) {
    return description && typeof description === 'string';
}

function validateTopRated(topRated) {
    return typeof topRated === 'boolean';
}

function validateAuthors(authors) {
    if (!authors) {
        return true;
    }

    if (!Array.isArray(authors) || authors.length === 0) {
        return false;
    }

    return authors.every(validateAuthor);
}

function validateAuthor(author) {
    const fields = ['id', 'firstName', 'lastName'];

    if (!author) {
        return false;
    }

    if (isIncorrectKeyInObj(author, fields)) {
        return false;
    }

    const authorValidators = {
        id: validateId,
        firstName: validateAuthorName,
        lastName: validateAuthorName
    };

    const notValidated = fields.some((field) => {
        if (!author[field]) {
            return true;
        }

        return !authorValidators[field](author[field]);
    });

    return !notValidated;
}

function validateId(id) {
    if (id === undefined) {
        return true;
    }

    return id && typeof id === 'number';
}

function validateAuthorName(name) {
    return name && typeof name === 'string';
}

function isIncorrectKeyInObj(obj, fields) {
    return Object.keys(obj).some((key) => !fields.includes(key));
}

module.exports = validateCourse;