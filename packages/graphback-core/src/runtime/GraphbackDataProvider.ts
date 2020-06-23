import { GraphbackPage, GraphbackOrderBy } from "./interfaces"

/**
 * Graphback layered architecture component that can be called
 * from the service layer in both RESTFULL and GraphQL middlewares.
 *
 * Graphback implements server side procesing using following flow:
 *
 * `GraphQL Resolvers` ->  `GraphbackCRUDService` [1-*] -> `GraphbackDataProvider`
 *
 * Data layer can be composable (each provider can reference multiple layers of other providers).
 *
 * @see GraphbackCRUDService
 */
//tslint:disable-next-line: no-any
export interface GraphbackDataProvider<Type = any, GraphbackContext = any> {

  /**
   * Implementation for object creation
   *
   * @param name name of the object to create
   * @param data input data
   * @param context context object passed from graphql or rest layer
   */
  create(data: Type, context: GraphbackContext): Promise<Type>;

  /**
   * Implementation for object updates
   *
   * @param name name of the object to create
   * @param data input data
   * @param context context object passed from graphql or rest layer
   */
  update(data: Type, context: GraphbackContext): Promise<Type>;

  /**
   * Implementation for object deletes
   *
   * @param name name of the object to create
   * @param data data used for checking consistency
   * @param context context object passed from graphql or rest layer
   */
  delete(data: Type, context: GraphbackContext): Promise<Type>;

  /**
   * Implementation for finding a single unique object
   *
   * @param args filter by unique attriburtes
   * @param context context object passed from graphql or rest layer
   */
  findOne(args: Partial<Type>, context: GraphbackContext): Promise<Type>;
  /**
   * Implementation for reading objects with filtering capabilities
   *
   * @param page paging context
   * @param orderBy gives the ability to order the results based on a field in ascending or descending order
   * @param filter filter by specific type
   * @param context context object passed from graphql or rest layer
   */
  findBy(filter: any,context: GraphbackContext, orderBy?: GraphbackOrderBy, page?: GraphbackPage): Promise<Type[]>;

  /**
   * Implementation for counting number of objects with filtering capabilities
   *
   * @param filter filter by specific type
   */
  count(filter: any): Promise<number>;

  /**
   * Read multiple items by their id's (used for lazy data loading purposes)
   *
   * @param relationField - name of the field that will be used to match ids
   * @param ids array of identifiers that needs to be fetched
   * @param context fields to select from datasource
   * @param filter filter by specific type
   */
  batchRead(relationField: string, ids: string[], filter: any, context: GraphbackContext): Promise<Type[][]>
}
