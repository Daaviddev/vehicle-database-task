import { makeObservable, observable, action, runInAction } from 'mobx';

import VehicleMakeService from '../services/VehicleMakeService';
import showMessagePopup from '../utils/messagePopupUtils';
import {
  resetSorting,
  updatePaginationConfig,
  updatePaginationState,
} from '../utils/storeUtils';

class VehicleMakeStore {
  makes = [];

  sortField = 'name';

  sortOrder = 'ASCENDING';

  filters = { field: 'name', operator: 'STARTS_WITH', value: '' };

  makeNames = [];

  // Pagination state for UI
  paginate = {
    currentPage: 1,
    pageSize: 5,
    totalPages: 1,
    previousPageToken: '',
    nextPageToken: '',
    filteredResults: 0,
  };

  // Pagination parameters for API requests
  pagination = {
    pageSize: 5,
    pageToken: '',
  };

  constructor() {
    makeObservable(this, {
      makes: observable,
      sortField: observable,
      makeNames: observable,
      sortOrder: observable,
      filters: observable,
      paginate: observable,
      addVehicleMake: action,
      deleteVehicleMake: action,
      updateVehicleMake: action,
      fetchMakes: action,
      sortMakes: action,
      filterMakes: action,
      paginationChange: action,
      getMakeNames: action,
    });

    this.addVehicleMake = this.addVehicleMake.bind(this);
    this.updateVehicleMake = this.updateVehicleMake.bind(this);
    this.deleteVehicleMake = this.deleteVehicleMake.bind(this);
    this.fetchMakes = this.fetchMakes.bind(this);
  }

  async fetchMakes(showErrorPopup = true) {
    try {
      const fetchedData = await VehicleMakeService.fetchMakesWithParams({
        sortField: this.sortField,
        sortOrder: this.sortOrder,
        filters: this.filters,
        pagination: this.pagination,
      });

      runInAction(() => {
        this.makes = fetchedData.documents.map((make) => ({
          ...make,
          name: make.nameDisplay,
        }));
      });
      updatePaginationState(this, fetchedData);
    } catch (error) {
      console.error(`Error during fetchMakes: ${error.message}`, error);
      if (showErrorPopup) {
        showMessagePopup(`Error during fetchMakes: ${error.message}`, 'error');
      }
    }
  }

  async getMakeNames() {
    try {
      const fetchedMakes = await VehicleMakeService.fetchMakes();

      runInAction(() => {
        this.makeNames = fetchedMakes.map((make) => ({
          name: make.nameDisplay,
          id: make.id,
        }));
      });
    } catch (error) {
      showMessagePopup(
        `Error during fetching make names: ${error.message}`,
        'error'
      );
    }
  }

  async addVehicleMake(data) {
    try {
      await VehicleMakeService.addVehicleMake(data);
      this.fetchMakes(false);

      showMessagePopup('Vehicle make added successfully.', 'success');
    } catch (error) {
      showMessagePopup(
        `Error during adding vehicle make: ${error.message}`,
        'error'
      );
    }
  }

  async updateVehicleMake(id, data) {
    try {
      await VehicleMakeService.updateVehicleMake(id, data);
      this.fetchMakes(false);

      showMessagePopup('Vehicle make updated successfully.', 'success');
    } catch (error) {
      showMessagePopup(
        `Error during updateVehicleMake: ${error.message}`,
        'error'
      );
    }
  }

  async deleteVehicleMake(id) {
    try {
      await VehicleMakeService.deleteVehicleMake(id);
      this.fetchMakes(false);

      showMessagePopup('Vehicle make deleted successfully.', 'success');
    } catch (error) {
      showMessagePopup(
        `Error during deleteVehicleMake: ${error.message}`,
        'error'
      );
    }
  }

  async paginationChange(paginationProps) {
    try {
      updatePaginationConfig(this, paginationProps);
      await this.fetchMakes(false);
    } catch (error) {
      showMessagePopup(
        `Error during pagination change: ${error.message}`,
        'error'
      );
    }
    return null;
  }

  async sortMakes(field) {
    try {
      runInAction(() => {
        this.sortField = field;
        this.sortOrder =
          this.sortOrder === 'ASCENDING' ? 'DESCENDING' : 'ASCENDING';
      });

      await this.fetchMakes(false);
    } catch (error) {
      showMessagePopup(`Error during sorting: ${error.message}`, 'error');
      console.error(`Error during sorting: ${error.message}`, error);
    }
  }

  async filterMakes(filter) {
    try {
      runInAction(() => {
        this.filters.field = filter.field;
        this.filters.operator = filter.operator;
        this.filters.value = filter.value;
      });
      resetSorting(this);

      await this.fetchMakes(false);
    } catch (error) {
      showMessagePopup(`Error during filtering: ${error.message}`, 'error');
    }
  }
}

export default new VehicleMakeStore();
