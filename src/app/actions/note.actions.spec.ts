import * as fromNote from './note.actions';

describe('loadNotes', () => {
  it('should return an action', () => {
    expect(fromNote.addNote.type).toBe('[Note] Add Note');
  });
});
