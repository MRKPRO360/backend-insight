import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  search(searchableFields: string[]) {
    const search = this?.query?.search;

    if (search) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map(
          (field) =>
            ({
              [field]: { $regex: search, $options: 'i' },
            }) as FilterQuery<T>,
        ),
      });
    }
    return this;
  }

  filter() {
    const queryObj = { ...this.query };
    const excludedFields = [
      'search',
      'sortBy',
      'sortOrder',
      'page',
      'limit',
      'fields',
    ];

    excludedFields.forEach((el) => delete queryObj[el]);

    this.modelQuery = this.modelQuery.find(queryObj);
    return this;
  }

  sort() {
    const sortArr = [];

    if (this.query?.sortBy) {
      const sortBy = (this?.query?.sortBy as string)?.split(',').join(' ');
      sortArr.push(sortBy);
    }

    if (this.query?.sortOrder) {
      const sortOrder =
        this.query?.sortOrder === 'asc' ? 'createdAt' : '-createdAt';
      sortArr.push(sortOrder);
    }

    const sort = sortArr.join(' ');

    this.modelQuery = this.modelQuery.sort(sort);

    return this;
  }

  paginate() {
    const limit = Number(this.query?.limit as string) || 10;
    const page = Number(this.query?.page as string) || 1;
    const skip = (page - 1) * limit || 0;

    this.modelQuery = this.modelQuery.skip(skip).limit(limit);
    return this;
  }

  limitField() {
    const fields = this.query?.fields
      ? (this?.query?.fields as string)?.split(',').join(' ')
      : '-__v';

    this.modelQuery = this.modelQuery.select(fields);
    return this;
  }
}

export default QueryBuilder;
