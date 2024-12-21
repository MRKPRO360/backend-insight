"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class QueryBuilder {
    constructor(modelQuery, query) {
        this.modelQuery = modelQuery;
        this.query = query;
    }
    search(searchableFields) {
        var _a;
        const search = (_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.search;
        if (search) {
            this.modelQuery = this.modelQuery.find({
                $or: searchableFields.map((field) => ({
                    [field]: { $regex: search, $options: 'i' },
                })),
            });
        }
        return this;
    }
    filter() {
        const queryObj = Object.assign({}, this.query);
        const excludedFields = [
            'search',
            'sortBy',
            'sortOrder',
            'page',
            'limit',
            'fields',
            'filter',
        ];
        excludedFields.forEach((el) => delete queryObj[el]);
        if (this.query.filter) {
            this.modelQuery = this.modelQuery.find({ author: this.query.filter });
        }
        this.modelQuery = this.modelQuery.find(queryObj);
        return this;
    }
    sort() {
        var _a, _b, _c, _d, _e;
        const sortArr = [];
        if ((_a = this.query) === null || _a === void 0 ? void 0 : _a.sortBy) {
            const sortBy = (_c = (_b = this === null || this === void 0 ? void 0 : this.query) === null || _b === void 0 ? void 0 : _b.sortBy) === null || _c === void 0 ? void 0 : _c.split(',').join(' ');
            sortArr.push(sortBy);
        }
        if ((_d = this.query) === null || _d === void 0 ? void 0 : _d.sortOrder) {
            const sortOrder = ((_e = this.query) === null || _e === void 0 ? void 0 : _e.sortOrder) === 'asc' ? 'createdAt' : '-createdAt';
            sortArr.push(sortOrder);
        }
        const sort = sortArr.join(' ');
        if (sort.length > 0) {
            this.modelQuery = this.modelQuery.sort(sort);
        }
        return this;
    }
    paginate() {
        var _a, _b;
        const limit = Number((_a = this.query) === null || _a === void 0 ? void 0 : _a.limit) || 10;
        const page = Number((_b = this.query) === null || _b === void 0 ? void 0 : _b.page) || 1;
        const skip = (page - 1) * limit || 0;
        this.modelQuery = this.modelQuery.skip(skip).limit(limit);
        return this;
    }
    limitField() {
        var _a, _b, _c;
        const fields = ((_a = this.query) === null || _a === void 0 ? void 0 : _a.fields)
            ? (_c = (_b = this === null || this === void 0 ? void 0 : this.query) === null || _b === void 0 ? void 0 : _b.fields) === null || _c === void 0 ? void 0 : _c.split(',').join(' ')
            : '-__v';
        this.modelQuery = this.modelQuery.select(fields);
        return this;
    }
}
exports.default = QueryBuilder;
