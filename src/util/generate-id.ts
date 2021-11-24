// Util
import { P } from './util';


export function generateId(): string {
  return P.last(P.uuidv4().split('-'));
}