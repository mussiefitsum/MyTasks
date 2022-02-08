const BaseJoi = require('joi');
const sanitizeHtml = require('sanitize-html');

const extension = (joi) => ({
    type: 'string',
    base: joi.string(),
    messages: {
        'string.escapeHTML': '{{#label}} must not include HTML!'
    },
    rules: {
        escapeHTML: {
            validate(value, helpers) {
                const clean = sanitizeHtml(value, {
                    allowedTags: [],
                    allowedAttributes: {},
                });
                if (clean !== value) return helpers.error('string.escapeHTML', { value })
                return clean;
            }
        }
    }
});

const Joi = BaseJoi.extend(extension);

module.exports.taskSchema = Joi.object({
    task: Joi.object({
        name: Joi.string().max(20).required().escapeHTML(),
        description: Joi.string().max(50).optional().allow('').escapeHTML(),
        category: Joi.string().required().escapeHTML(),
        status: Joi.string().required(),
        date: Joi.string().required()
    }).required()
})