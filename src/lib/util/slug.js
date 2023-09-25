export default function slugify(string, prefix = '') {
    return prefix + string.toString().toLowerCase().trim().replace("'", "").replace(/[\s\W-]+/g, '-')
}