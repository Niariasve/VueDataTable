<?php

namespace Database\Factories;

use App\Models\Customer;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Customer>
 */
class CustomerFactory extends Factory
{
    /**
     * The model that corresponds to this factory.
     *
     * @var class-string<Customer>
     */
    protected $model = Customer::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $firstName = fake()->firstName();
        $lastName = fake()->lastName();
        $companyName = fake()->boolean(35) ? fake()->company() : null;
        $documentType = fake()->randomElement(['DNI', 'Passport', 'RUC', 'Cedula']);

        return [
            'first_name' => $firstName,
            'last_name' => $lastName,
            'full_name' => $firstName.' '.$lastName,
            'email' => fake()->unique()->safeEmail(),
            'phone' => fake()->unique()->numerify('+593 #########'),
            'document_type' => $documentType,
            'document_number' => fake()->unique()->numerify('############'),
            'birth_date' => fake()->dateTimeBetween('-65 years', '-18 years')->format('Y-m-d'),
            'gender' => fake()->randomElement(['Male', 'Female', 'Other']),
            'company_name' => $companyName,
            'tax_id' => $companyName ? fake()->unique()->numerify('##########') : null,
            'country' => fake()->randomElement(['Ecuador', 'Colombia', 'Peru', 'Chile', 'United States']),
            'state' => fake()->state(),
            'city' => fake()->city(),
            'address' => fake()->streetAddress(),
            'postal_code' => fake()->postcode(),
            'notes' => fake()->optional(0.35)->sentence(12),
            'is_active' => fake()->boolean(90),
            'last_contacted_at' => fake()->optional(0.7)->dateTimeBetween('-18 months', 'now'),
        ];
    }
}
