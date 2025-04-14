/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("drone_detections", (table) => {
      table.increments("id").primary();
      table.text("detection_data").notNullable();
      table.timestamps(true, true)
    })
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
      return knex.schema.dropTable("drone_detections");
  };
