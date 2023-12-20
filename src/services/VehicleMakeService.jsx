import BaseService from './BaseService';
import createQuery from '../utils/queryUtils';

class VehicleMakeService extends BaseService {
  constructor() {
    super('vehicleMake'); // Endpoint URL
  }

  async fetchMakes() {
    return this.read();
  }

  async fetchMakesWithParams(data) {
    return this.readWithParams(createQuery(data));
  }

  async addVehicleMake(data) {
    return this.create(data);
  }

  async updateVehicleMake(id, data) {
    return this.update(id, data);
  }

  async deleteVehicleMake(id) {
    return this.delete(id);
  }
}

export default new VehicleMakeService();
