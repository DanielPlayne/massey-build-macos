'use babel';

import MasseyBuildMacOS from '../lib/massey-build-macos';

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.

describe('MasseyBuildMacOS', () => {
  let workspaceElement, activationPromise;

  beforeEach(() => {
    workspaceElement = atom.views.getView(atom.workspace);
    activationPromise = atom.packages.activatePackage('massey-build-macos');
  });

  describe('when the massey-build-macos:toggle event is triggered', () => {
    it('hides and shows the modal panel', () => {
      // Before the activation event the view is not on the DOM, and no panel
      // has been created
      expect(workspaceElement.querySelector('.massey-build-macos')).not.toExist();

      // This is an activation event, triggering it will cause the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'massey-build-macos:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        expect(workspaceElement.querySelector('.massey-build-macos')).toExist();

        let masseyBuildMacOSElement = workspaceElement.querySelector('.massey-build-macos');
        expect(masseyBuildMacOSElement).toExist();

        let masseyBuildMacOSPanel = atom.workspace.panelForItem(masseyBuildMacOSElement);
        expect(masseyBuildMacOSPanel.isVisible()).toBe(true);
        atom.commands.dispatch(workspaceElement, 'massey-build:toggle');
        expect(masseyBuildMacOSPanel.isVisible()).toBe(false);
      });
    });

    it('hides and shows the view', () => {
      // This test shows you an integration test testing at the view level.

      // Attaching the workspaceElement to the DOM is required to allow the
      // `toBeVisible()` matchers to work. Anything testing visibility or focus
      // requires that the workspaceElement is on the DOM. Tests that attach the
      // workspaceElement to the DOM are generally slower than those off DOM.
      jasmine.attachToDOM(workspaceElement);

      expect(workspaceElement.querySelector('.massey-build-macos')).not.toExist();

      // This is an activation event, triggering it causes the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'massey-build-macos:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        // Now we can test for view visibility
        let masseyBuildMacOSElement = workspaceElement.querySelector('.massey-build-macos');
        expect(masseyBuildMacOSElement).toBeVisible();
        atom.commands.dispatch(workspaceElement, 'massey-build-macos:toggle');
        expect(masseyBuildMacOSElement).not.toBeVisible();
      });
    });
  });
});
