import { apiCall } from '../../sagas/actions';
import * as ACTIONS from './actionTypes';
import { Streams } from "@tapis/tapis-typescript";
import { MeasurementsListCallback } from './types';
import {
  OnRequestCallback,
  OnSuccessCallback,
  OnFailureCallback
} from 'tapis-redux/sagas/types';
import { Config } from 'tapis-redux/types';

// Create a 'list' dispatch generator
export const list = (config: Config = null, params: Streams.ListMeasurementsRequest, onList: MeasurementsListCallback = null) => {

  const onRequest: OnRequestCallback = () => {
    return {
      type: ACTIONS.TAPIS_MEASUREMENTS_LIST_REQUEST,
    }
  }

  const onSuccess: OnSuccessCallback<Streams.RespListMeasurements> = (result) => {
    return {
      type: ACTIONS.TAPIS_MEASUREMENTS_LIST_SUCCESS,
      payload: {
        params,
        incoming: result.result
      }
    }
  }

  const onFailure: OnFailureCallback = (error) => {
    return {
      type: ACTIONS.TAPIS_MEASUREMENTS_LIST_FAILURE,
      payload: {
        error,
        params
      }
    }
  }

  return apiCall<Streams.RespListMeasurements>({
    config,
    onApi: onList,
    onRequest,
    onSuccess,
    onFailure,
    module: Streams,
    api: Streams.MeasurementsApi,
    func: Streams.MeasurementsApi.prototype.listMeasurements,
    args: [params]
  });
};