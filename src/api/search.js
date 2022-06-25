export default class Search {
  #BASE_URL = 'https://registry.npmjs.org/';

  #SEARCH_URL = `${this.#BASE_URL}-/v1/search`;

  #SIZE = 10;

  /**
   * Get package by name
   * @param {string} name - package name
   * @return {object} finded package
   */
  async getPackage(name = '') {
    if (!name) return [];
    const result = await fetch(
      `${this.#BASE_URL}/${name}`,
      { method: 'GET', mode: 'cors' },
    );
    return result.json();
  }

  /**
   * Search packages by query
   * @param {string} query - main query
   * @param {number} page - page to search
   * @return {array} finded packages
   */
  async searchPackage(query = '', page = 1) {
    if (!query) return [];
    const result = await fetch(
      `${this.#SEARCH_URL}?text=${query}&size=${this.#SIZE}&from=${(page - 1) * this.#SIZE}`,
      { method: 'GET', mode: 'cors' },
    );
    return result.json();
  }
}
