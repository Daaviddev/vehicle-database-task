import { makeObservable, observable, action, runInAction } from 'mobx';

import VehicleModelService from '../services/VehicleModelService';
import showMessagePopup from '../utils/messagePopupUtils';
import {
  resetSorting,
  updatePaginationConfig,
  updatePaginationState,
} from '../utils/storeUtils';

class VehicleModelStore {
  models = [];

  sortField = 'name';

  sortOrder = 'ASCENDING';

  filters = { field: 'name', operator: 'STARTS_WITH', value: '' };

  // Pagination state for UI
  paginate = {
    currentPage: 1,
    pageSize: 3,
    totalPages: 1,
    previousPageToken: '',
    nextPageToken: '',
    filteredResults: 0,
  };

  // Pagination parameters for API requests
  pagination = {
    pageSize: 3,
    pageToken: '',
  };

  constructor() {
    makeObservable(this, {
      models: observable,
      sortField: observable,
      sortOrder: observable,
      filters: observable,
      paginate: observable,
      addVehicleModel: action,
      deleteVehicleModel: action,
      updateVehicleModel: action,
      fetchModels: action,
      sortModels: action,
      filterModels: action,
      paginationChange: action,
    });
  }

  async fetchModels(showErrorPopup = true) {
    try {
      const fetchedData = await VehicleModelService.fetchModelsWithParams({
        sortField: this.sortField,
        sortOrder: this.sortOrder,
        filters: this.filters,
        pagination: this.pagination,
      });

      runInAction(() => {
        this.models = fetchedData.documents.map((model) => ({
          ...model,
          name: model.nameDisplay,
          make: model.makeDisplay,
        }));
      });
      updatePaginationState(this, fetchedData);
    } catch (error) {
      console.error(`Error during fetchModels: ${error.message}`, error);
      if (showErrorPopup) {
        showMessagePopup(`Error during fetchModels: ${error.message}`, 'error');
      }
    }
  }

  async addVehicleModel(data) {
    try {
      const parsedData = { ...data };

      if (parsedData.make && typeof parsedData.make === 'string') {
        const makeObject = JSON.parse(parsedData.make);

        parsedData.make = makeObject.name;
        parsedData.makeId = makeObject.id;
      }

      await VehicleModelService.addVehicleModel(parsedData);
      this.fetchModels(false);

      showMessagePopup('Vehicle model added successfully.', 'success');
    } catch (error) {
      showMessagePopup(
        `Error during addVehicleModel: ${error.message}`,
        'error'
      );
    }
  }

  async updateVehicleModel(id, data) {
    try {
      const parsedData = { ...data };

      if (parsedData.make && typeof parsedData.make === 'string') {
        const makeObject = JSON.parse(parsedData.make);

        parsedData.make = makeObject.name;
        parsedData.makeId = makeObject.id;
      }

      await VehicleModelService.updateVehicleModel(id, parsedData);
      this.fetchModels(false);
      showMessagePopup('Vehicle model updated successfully.', 'success');
    } catch (error) {
      showMessagePopup(
        `Error during updateVehicleModel: ${error.message}`,
        'error'
      );
    }
  }

  async deleteVehicleModel(id) {
    try {
      await VehicleModelService.deleteVehicleModel(id);
      this.fetchModels(false);
      showMessagePopup('Vehicle model deleted successfully.', 'success');
    } catch (error) {
      showMessagePopup(
        `Error during deleteVehicleModel: ${error.message}`,
        'error'
      );
    }
  }

  async paginationChange(paginationProps) {
    try {
      updatePaginationConfig(this, paginationProps);
      await this.fetchModels(false);
    } catch (error) {
      showMessagePopup(
        `Error during pagination change: ${error.message}`,
        'error'
      );
    }
  }

  async sortModels(field) {
    try {
      runInAction(() => {
        this.sortField = field;
        this.sortOrder =
          this.sortOrder === 'ASCENDING' ? 'DESCENDING' : 'ASCENDING';
      });
      await this.fetchModels(false);
    } catch (error) {
      showMessagePopup(`Error during sorting: ${error.message}`, 'error');
    }
  }

  async filterModels(filter) {
    try {
      runInAction(() => {
        this.filters = filter;
        resetSorting(this);
      });
      await this.fetchModels(false);
    } catch (error) {
      showMessagePopup(`Error during filtering: ${error.message}`, 'error');
    }
  }
}

export default new VehicleModelStore();
