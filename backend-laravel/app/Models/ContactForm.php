<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ContactForm extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'name',
        'whatsapp_number',
        'event_date',
        'occasion',
        'size',
        'message'
    ];
}
