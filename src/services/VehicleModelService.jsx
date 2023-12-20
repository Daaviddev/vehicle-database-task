import BaseService from './BaseService';
import createQuery from '../utils/queryUtils';

class VehicleModelService extends BaseService {
  constructor() {
    super('vehicleModel'); // Endpoint URL
  }

  async fetchModels() {
    return this.read();
  }

  async fetchModelsWithParams(data) {
    return this.readWithParams(createQuery(data));
  }

  async addVehicleModel(data) {
    return this.create(data);
  }

  async updateVehicleModel(id, data) {
    return this.update(id, data);
  }

  async deleteVehicleModel(id) {
    return this.delete(id);
  }
}

export default new VehicleModelService();
