import {Entity, model, property} from '@loopback/repository';

@model()
export class Offer extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  _id?: string;

  @property({
    type: 'date',
    required: true,
  })
  offerDate: string;

  @property({
    type: 'string',
    required: true,
  })
  remarks: string;

  @property({
    type: 'string',
    required: true,
  })
  offerStatus: string;


  constructor(data?: Partial<Offer>) {
    super(data);
  }
}

export interface OfferRelations {
  // describe navigational properties here
}

export type OfferWithRelations = Offer & OfferRelations;
