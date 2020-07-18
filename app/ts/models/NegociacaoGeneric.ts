import { Printer } from './Printer'
import { Equals } from './Equals'

export interface NegociacaoGeneric<T> extends Printer, Equals<T>{} 