<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'name_az',
        'name_en',
        'description_az',
        'description_en',
        'image_url',
        'price',
        'images'
    ];
}
