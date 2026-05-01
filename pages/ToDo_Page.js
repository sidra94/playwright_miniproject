const { test, expect } = require("@playwright/test")
exports.ToDO_Page = class ToDO_Page {


   constructor(page) {
      this.page = page
      this.text_input = this.page.getByTestId('text-input')
      this.footer_note = this.page.locator('//span[@class="todo-count"]')
      this.activelist = this.page.locator('//ul/li/div/label[@data-testid="todo-item-label"]')
      this.completedlist = this.page.locator('//ul/li[@class="completed"]')
      this.active_link = this.page.getByRole('link', { name: 'Active' })
      this.completed_link = this.page.getByRole('link', { name: 'Completed' })
      this.active_toggle = this.page.getByTestId('todo-item-toggle')
      this.clear_items = this.page.getByRole('button', { name: 'Clear completed' })


   }

   async url_navigation() {
      await this.page.goto('https://todomvc.com/examples/react/dist/')
      await expect(this.page.getByRole('heading', { name: 'todos' })).toHaveText('todos')

   }

   async add_list(items) {

      // Step 1: Loop through each item in the list
      for (const item of items) {

         // Fill the input box with the current item text
         await this.text_input.fill(item)

         // Press Enter to add the item to the list
         await this.text_input.press('Enter')
      }

      // Step 2: Verify that the number of items added
      // matches the count displayed in the footer
      // items.length gives total items added
      await expect(this.footer_note).toContainText(items.length.toString())
   }


   async mark_completed() {

      // Step 1: Go to the "Completed" tab
      await this.completed_link.click()

      // Step 2: Count how many items are already completed
      const completed_count = await this.completedlist.count()

      // Step 3: If no items are completed yet
      if (completed_count == 0) {

         // Switch to "Active" tab to work on pending items
         await this.active_link.click()

         // Step 4: Keep clicking items until no active items are left
         // count() is checked every time because DOM updates after each click
         while (await this.active_toggle.count() > 0) {

            // Always click the first item in the list
            // After clicking, it moves to "Completed", so next item becomes first
            await this.active_toggle.first().click()
         }
      }

      // Step 5: Go back to "Completed" tab to verify results
      await this.completed_link.click()

      // Step 6: Assert that no active items are left
      // (All items should now be completed)
      await expect(this.footer_note).toHaveText("0 items left!")
   }


   async clear_completed() {


      await this.clear_items.click()
      //Asset that all items are cleared and user is landed on text box to build a new list
      await expect(this.text_input).toHaveAttribute('placeholder',"What needs to be done?")


   }

}






