# Database Schema

This schema is planned for Supabase Postgres.

## institutes

| Column | Type | Notes |
|---|---|---|
| id | uuid | Primary key |
| name | text | Institute name |
| slug | text | Unique identifier |
| logo_url | text | Optional |
| subscription_status | text | trial, active, paused, cancelled |
| created_at | timestamptz | Created time |

## profiles

| Column | Type | Notes |
|---|---|---|
| id | uuid | References auth.users |
| institute_id | uuid | References institutes |
| full_name | text | User name |
| role | text | student, faculty, lab_assistant, admin |
| avatar_url | text | Optional |
| created_at | timestamptz | Created time |

## campuses

| Column | Type | Notes |
|---|---|---|
| id | uuid | Primary key |
| institute_id | uuid | References institutes |
| name | text | Campus name |
| description | text | Optional |
| world_asset_id | uuid | Optional asset reference |
| created_at | timestamptz | Created time |

## departments

| Column | Type | Notes |
|---|---|---|
| id | uuid | Primary key |
| institute_id | uuid | References institutes |
| campus_id | uuid | References campuses |
| name | text | Department name |
| floor_count | int | Optional |
| created_at | timestamptz | Created time |

## laboratories

| Column | Type | Notes |
|---|---|---|
| id | uuid | Primary key |
| institute_id | uuid | References institutes |
| department_id | uuid | References departments |
| name | text | Lab name |
| lab_type | text | molecular_biology, microbiology, cell_culture |
| access_level | int | Minimum level |
| scene_key | text | Frontend scene key |
| created_at | timestamptz | Created time |

## training_modules

| Column | Type | Notes |
|---|---|---|
| id | uuid | Primary key |
| title | text | Training title |
| module_type | text | safety, instrument, experiment |
| lab_id | uuid | Optional lab reference |
| required_for_lab_access | boolean | Access requirement |
| content_url | text | SOP or video |
| created_at | timestamptz | Created time |

## user_training_progress

| Column | Type | Notes |
|---|---|---|
| id | uuid | Primary key |
| user_id | uuid | References profiles |
| training_module_id | uuid | References training_modules |
| status | text | not_started, in_progress, completed, failed |
| score | numeric | Optional |
| completed_at | timestamptz | Optional |

## career_levels

| Column | Type | Notes |
|---|---|---|
| id | uuid | Primary key |
| title | text | Intern, Junior Intern, Research Trainee |
| rank_order | int | Progression order |
| xp_required | int | Required XP |
| unlock_description | text | Unlock details |

## user_progress

| Column | Type | Notes |
|---|---|---|
| user_id | uuid | Primary key, references profiles |
| career_level_id | uuid | References career_levels |
| xp | int | User XP |
| current_spawn_zone | text | Current world zone |
| updated_at | timestamptz | Updated time |

## instruments

| Column | Type | Notes |
|---|---|---|
| id | uuid | Primary key |
| lab_id | uuid | References laboratories |
| name | text | Instrument name |
| instrument_type | text | centrifuge, pcr_machine, microscope |
| asset_key | text | 3D model key |
| requires_training | boolean | Default true |
| status | text | available, in_use, maintenance |

## reagents

| Column | Type | Notes |
|---|---|---|
| id | uuid | Primary key |
| lab_id | uuid | References laboratories |
| name | text | Reagent name |
| unit | text | ml, ul, g, mg |
| hazard_level | text | low, medium, high |
| storage_condition | text | room_temp, refrigerated, frozen |
| stock_quantity | numeric | Virtual inventory |

## experiments

| Column | Type | Notes |
|---|---|---|
| id | uuid | Primary key |
| lab_id | uuid | References laboratories |
| title | text | Experiment title |
| experiment_key | text | Frontend module key |
| difficulty | int | 1-5 |
| estimated_minutes | int | Optional |
| requires_training_module_id | uuid | Optional |
| created_at | timestamptz | Created time |

## experiment_steps

| Column | Type | Notes |
|---|---|---|
| id | uuid | Primary key |
| experiment_id | uuid | References experiments |
| step_order | int | SOP order |
| title | text | Step title |
| instruction | text | Student instruction |
| expected_action | jsonb | Validation data |
| mistake_rules | jsonb | Mistake conditions |

## experiment_attempts

| Column | Type | Notes |
|---|---|---|
| id | uuid | Primary key |
| user_id | uuid | References profiles |
| experiment_id | uuid | References experiments |
| status | text | started, completed, failed, abandoned |
| score | numeric | 0-100 |
| result_quality | text | excellent, acceptable, contaminated, failed |
| started_at | timestamptz | Start time |
| completed_at | timestamptz | End time |

## experiment_action_logs

| Column | Type | Notes |
|---|---|---|
| id | uuid | Primary key |
| attempt_id | uuid | References experiment_attempts |
| step_id | uuid | References experiment_steps |
| action_type | text | pickup, measure, use_instrument, dispose |
| payload | jsonb | Action details |
| is_correct | boolean | Validation result |
| created_at | timestamptz | Created time |

## mistakes

| Column | Type | Notes |
|---|---|---|
| id | uuid | Primary key |
| attempt_id | uuid | References experiment_attempts |
| mistake_type | text | contamination, wrong_quantity, unsafe_behavior |
| severity | text | low, medium, high, critical |
| description | text | Explanation |
| consequence | text | Result impact |
| created_at | timestamptz | Created time |

## contamination_events

| Column | Type | Notes |
|---|---|---|
| id | uuid | Primary key |
| attempt_id | uuid | References experiment_attempts |
| source | text | gloves, bench, reagent, instrument, waste |
| severity | text | low, medium, high |
| affected_step_id | uuid | Optional |
| created_at | timestamptz | Created time |

## reports

| Column | Type | Notes |
|---|---|---|
| id | uuid | Primary key |
| attempt_id | uuid | References experiment_attempts |
| user_id | uuid | References profiles |
| report_url | text | Generated file |
| summary | text | Summary |
| created_at | timestamptz | Created time |

